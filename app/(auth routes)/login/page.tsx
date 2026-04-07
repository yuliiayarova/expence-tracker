import LoginForm from "./LoginForm";
import css from "./Login.module.css";

export default function LoginPage() {
  return (
    <div className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <p className={css.formDescr}>
        Welcome back to effortless expense tracking! Your financial dashboard
        awaits.
      </p>
      <LoginForm />
    </div>
  );
}
