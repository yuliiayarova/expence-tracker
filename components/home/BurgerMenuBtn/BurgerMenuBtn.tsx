import css from "./BurgerMenuBtn.module.css";

interface BurgerMenuBtnProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function BurgerMenuBtn({
  isOpen,
  onClick,
}: BurgerMenuBtnProps) {
  return (
    <button
      type="button"
      className={css.menuButton}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      {isOpen ? (
        <span className={css.closeIcon}>×</span>
      ) : (
        <svg className={css.menuIcon} aria-hidden="true">
          <use href="/icons/sprite.svg#icon-burger-menu" />
        </svg>
      )}
    </button>
  );
}
