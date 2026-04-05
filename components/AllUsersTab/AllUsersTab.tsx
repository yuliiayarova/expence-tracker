import Image from "next/image";
import css from "./AllUsersTab.module.css"

export default function AllUsersTab() {
    return (
        <section className={css.userstab}>
            <div className={css.usersAvatar}>
            <Image src="/user_1.png" alt="user" width={48} height={48} className={css.avatar} />
            <Image src="/user_2.png" alt="user" width={48} height={48} className={css.avatar}/>
            <Image src="/user_3.png" alt="user" width={48} height={48} className={css.avatar}/>
            </div>
            <div className={css.textBox}>
            <h2 className={css.info}>1000 users + </h2>
            <p className={css.description}>Trusted by users for reliable expense tracking!</p>
        </div>
        </section>
    )
}