import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { refreshSession } from "./lib/api/server/auth/authServerApi";

const privateRoutes = ["/transactions"];
const publicRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await refreshSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);

            if (parsed.accessToken) {
              cookieStore.set("accessToken", parsed.accessToken);
            }

            if (parsed.refreshToken) {
              cookieStore.set("refreshToken", parsed.refreshToken);
            }
          }

          if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }

          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      } catch {
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/transactions/:path*", "/login", "/register"],
};
