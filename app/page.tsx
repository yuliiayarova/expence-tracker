import WelcomePage from "@/components/WellcomPage/WellcomPage";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/transactions/expenses");
  return <WelcomePage />;
}
