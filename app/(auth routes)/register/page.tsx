import RegisterForm from "./RegisterForm";
import css from "./Register.module.css";

export default function RegisterPage() {
  return (
    <div className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <p className={css.formDescr}>
        Step into a world of hassle-free expense management! Your journey
        towards financial mastery begins here.
      </p>

      <RegisterForm />
    </div>
  );
}
