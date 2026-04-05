'use client'
import React from 'react';
import Button from '../Button/Button';

import css from "./AuthNav.module.css"

export default function AuthNav() {
    const handleClick = (type: "signup" | "signin") => {
    alert(` ${type === "signup" ? "Sign Up" : "Sign In"}`);
  };
    return (
        <section>
            <nav className={css.nav}>
                <Button text="Sign Up" onClick={() => handleClick("signup")} className={css.btn} />
                <Button text="Sign In" onClick={() => handleClick("signin")} className={`${css.btn} ${css.btnSecondary}`} />
            </nav>
        </section>
    )
}