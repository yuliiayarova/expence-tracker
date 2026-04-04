import css from "./WellcomPage.module.css";
import AllUsersTab from "../AllUsersTab/AllUsersTab";
import AuthNav from "../AuthNav/AuthNav";
import { BgImageWrapper } from "../BgImageWrapper/BgImageWrapper";

export default function WelcomePage() {
  return (
    <div className={css.wrapper}>
      <div className={css.page}>
        <div className={css.section}>
          <p className={css.log}>EXPENSE LOG</p>

          <h1 className={css.title}>
            Manage Your <span className={css.span}>Finances</span> Masterfully!
          </h1>

          <p className={css.description}>
            ExpenseTracker effortlessly empowers you to take control of your
            finances! With intuitive features, it simplifies the process of
            tracking and managing expenses, allowing for a stress-free mastery
            over your financial world.
          </p>
        </div>

        <AuthNav />
        <AllUsersTab />
      </div>
      <BgImageWrapper />
    </div>
  );
}
