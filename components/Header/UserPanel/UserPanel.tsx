import css from "./UserPanel.module.css";

interface UserPanelProps {
  onProfileSettingsClick: () => void;
  onLogoutClick: () => void;
}

export default function UserPanel({
  onProfileSettingsClick,
  onLogoutClick,
}: UserPanelProps) {
  return (
    <div className={css.userPanel} role="menu">
      <button
        type="button"
        className={css.userPanelItem}
        onClick={onProfileSettingsClick}
      >
        <svg className={css.userPanelIcon} aria-hidden="true">
          <use href="/icons/sprite.svg#icon-user" />
        </svg>
        Profile settings
      </button>
      <button
        type="button"
        className={css.userPanelItem}
        onClick={onLogoutClick}
      >
        <svg className={css.userPanelIcon} aria-hidden="true">
          <use href="/icons/sprite.svg#icon-log-out" />
        </svg>
        Log out
      </button>
    </div>
  );
}
