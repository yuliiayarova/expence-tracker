import Icon from "@/components/Icon/Icon";
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
        <Icon
          name="icon-user"
          size={16}
          className={css.userPanelIcon}
          aria-hidden="true"
        />
        Profile settings
      </button>
      <button
        type="button"
        className={css.userPanelItem}
        onClick={onLogoutClick}
      >
        <Icon
          name="icon-log-out"
          size={16}
          className={css.userPanelIcon}
          aria-hidden="true"
        />
        Log out
      </button>
    </div>
  );
}
