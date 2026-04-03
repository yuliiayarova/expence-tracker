/* eslint-disable @next/next/no-img-element */

import css from "./UserBarBtn.module.css";

interface UserBarBtnProps {
  userName: string;
  avatarUrl?: string | null;
  initials: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function UserBarBtn({
  userName,
  avatarUrl,
  initials,
  isOpen,
  onToggle,
}: UserBarBtnProps) {
  return (
    <button
      type="button"
      className={css.profileButton}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      <span className={css.avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={userName} className={css.avatarImage} />
        ) : (
          initials
        )}
      </span>
      <span className={css.userName}>{userName}</span>
      <svg
        className={isOpen ? `${css.profileIcon} ${css.profileIconOpen}` : css.profileIcon}
        aria-hidden="true"
      >
        <use href="/icons/sprite.svg#icon-chevron-down" />
      </svg>
    </button>
  );
}
