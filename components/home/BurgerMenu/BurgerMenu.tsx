import type { ReactNode } from "react";

import css from "./BurgerMenu.module.css";

interface BurgerMenuProps {
  userBar: ReactNode;
  nav: ReactNode;
  onClose: () => void;
}

export default function BurgerMenu({
  userBar,
  nav,
  onClose,
}: BurgerMenuProps) {
  return (
    <div className={css.burgerBackdrop} onClick={onClose} role="presentation">
      <aside className={css.burgerMenu} onClick={(event) => event.stopPropagation()}>
        <div className={css.burgerTop}>
          {userBar}
          <button
            type="button"
            className={css.burgerClose}
            aria-label="Close menu"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <nav className={css.burgerNav} aria-label="Transactions history">
          {nav}
        </nav>
      </aside>
    </div>
  );
}
