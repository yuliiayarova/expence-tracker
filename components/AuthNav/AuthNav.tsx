'use client'
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

import css from "./AuthNav.module.css"

export default function AuthNav() {
    const router = useRouter()
    const handleClick = (type: "signup" | "signin") => {
        if (type === "signup") {
        router.push("/register")
        } else {
            router.push("/login")
    }
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