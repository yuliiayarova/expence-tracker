"use client";

import { useRouter } from "next/navigation";
import css from "./Register.module.css";
import { useState } from "react";

import { AxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentUser } from "@/lib/api/user/userApi";
import { RegisterRequest } from "@/lib/api/auth/auth.types";
import { register } from "@/lib/api/auth/authApi";
import Button from "@/components/Button/Button";
import Link from "next/link";

type ErrorResponse = {
  error?: string;
  message?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    setError("");

    try {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        setError("Please fill in all fields correctly");
        return;
      }

      const formValues: RegisterRequest = { name, email, password };

      await register(formValues);

      const user = await getCurrentUser();
      setUser(user);

      router.replace("/transactions/[transactionsType]");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      setError(
        axiosError.response?.data?.error ??
          axiosError.response?.data?.message ??
          axiosError.message ??
          "Oops... some error",
      );
    }
  };

  return (
    <div className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <p className={css.formDescr}>
        Step into a world of hassle-free expense management! Your journey
        towards financial mastery begins here.
      </p>
      <form className={css.form} action={handleSubmit}>
        <div className={css.fieldset}>
          <label className={css.visuallyHidden} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            className={css.input}
            required
          />
        </div>

        <div className={css.fieldset}>
          <label className={css.visuallyHidden} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className={css.input}
            required
          />
        </div>

        <div className={css.fieldset}>
          <label className={css.visuallyHidden} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <Button className={css.submitButton} type="submit" text="Sign Up" />
          <p className={css.signInText}>
            Already have account? &nbsp;
            <Link className={css.signInLink} href="/login">
              Sign In
            </Link>
          </p>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </div>
  );
}
