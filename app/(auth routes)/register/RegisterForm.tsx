"use client";

import { useRouter } from "next/navigation";
import css from "./Register.module.css";
import { useId } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/Button/Button";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import { register } from "@/lib/api/client/auth/authApi";
import { getCurrentUser } from "@/lib/api/client/user/userApi";
import { RegisterRequest } from "@/lib/api/types/auth.types";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";

const initialValues: RegisterRequest = {
  name: "",
  email: "",
  password: "",
};

type ErrorResponse = {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
};

export const registerSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be at most 32 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .lowercase()
    .matches(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Email format is not supported")
    .email("Invalid email format")
    .max(64, "Email must be at most 64 characters")
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const id = useId();

  const handleSubmit = async (
    values: RegisterRequest,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      await register(values);

      const user = await getCurrentUser();
      setUser(user);

      router.replace("/transactions/expenses");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      toast.error(
        axiosError.response?.data?.response?.message ??
          axiosError.response?.data?.message ??
          axiosError.response?.data?.error ??
          axiosError.message ??
          "Oops... some error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldset}>
            <label className={css.visuallyHidden} htmlFor={`${id}-name`}>
              Name
            </label>
            <Field
              id={`${id}-name`}
              type="text"
              name="name"
              placeholder="Name"
              className={`${css.input} ${
                errors.name && touched.name ? css.inputError : ""
              }`}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.fieldset}>
            <label className={css.visuallyHidden} htmlFor={`${id}-email`}>
              Email
            </label>
            <Field
              id={`${id}-email`}
              type="email"
              name="email"
              placeholder="Email"
              className={`${css.input} ${
                errors.email && touched.email ? css.inputError : ""
              }`}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <PasswordInput
            id={`${id}-password`}
            name="password"
            placeholder="Password"
          />

          <div className={css.actions}>
            <div className={css.loadingWrapper}>
              <Button
                className={css.submitButton}
                type="submit"
                text={isSubmitting ? "Signing Up..." : "Sign Up"}
                disabled={isSubmitting}
              />
              {isSubmitting && <Loader size="small" />}
            </div>

            <p className={css.signInText}>
              Already have account? &nbsp;
              <Link className={css.signInLink} href="/login">
                Sign In
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
