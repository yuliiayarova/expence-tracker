"use client";

import { useState } from "react";
import { useField } from "formik";
import css from "./PasswordInput.module.css";
import Icon from "../Icon/Icon";
import clsx from "clsx";

type PasswordInputProps = {
  id: string;
  name: string;
  placeholder?: string;
};

export default function PasswordInput({
  id,
  name,
  placeholder = "Password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [field, meta] = useField(name);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isError = meta.touched && !!meta.error;
  const isSuccess = meta.touched && !meta.error && field.value.length > 0;
  return (
    <div className={css.wrapper}>
      <label className={css.visuallyHidden} htmlFor={id}>
        Password
      </label>

      <input
        {...field}
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`${css.input} 
    ${isError ? css.inputError : ""} 
    ${isSuccess ? css.inputSuccess : ""}
  `}
      />
      {isError && <span className={css.error}>{meta.error}</span>}

      {isSuccess && <span className={css.success}>Password is secure</span>}

      <div className={css.icons}>
        {(isError || isSuccess) && (
          <span className={css.statusIcon}>
            <Icon
              name={isError ? "icon-error" : "icon-success"}
              size={20}
              className={clsx(css.icon, {
                [css.errorIcon]: isError,
                [css.successIcon]: isSuccess,
              })}
            />
          </span>
        )}

        <button
          type="button"
          className={css.toggle}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon
            name={showPassword ? "icon-eye" : "icon-eye-off"}
            size={20}
            className={css.icon}
          />
        </button>
      </div>
    </div>
  );
}
