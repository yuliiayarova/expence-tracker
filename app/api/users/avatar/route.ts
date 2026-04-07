export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const contentType = request.headers.get("content-type") ?? "";
    const body = await request.arrayBuffer();

    const res = await api.patch("/users/avatar", Buffer.from(body), {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": contentType,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    const res = await api.delete("/users/avatar", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return new NextResponse(null, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
