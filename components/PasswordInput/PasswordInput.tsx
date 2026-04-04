"use client";

import { useState } from "react";
import css from "./PasswordInput.module.css";
import Icon from "../Icon/Icon";

type PasswordInputProps = {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
};

export default function PasswordInput({
  id,
  name,
  placeholder = "Password",
  required = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={css.wrapper}>
      <label className={css.visuallyHidden} htmlFor={id}>
        Password
      </label>

      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={css.input}
        required={required}
      />

      <button
        type="button"
        className={css.toggle}
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
      >
        {showPassword ? (
          <Icon name="icon-eye" size={20} />
        ) : (
          <Icon name="icon-eye-off" size={20} />
        )}
      </button>
    </div>
  );
}
