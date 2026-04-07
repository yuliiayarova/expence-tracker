import Button from "../Button/Button";
import css from "./Logout.module.css";

interface LogoutProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function Logout({
  onConfirm,
  onCancel,
  isLoading = false,
}: LogoutProps) {
  return (
    <div>
      <p className={css.logoutText}>Are you sure you want to log out?</p>

      <div className={css.buttonWrapper}>
        <Button
          text={isLoading ? "Logging out..." : "Log out"}
          onClick={onConfirm}
          disabled={isLoading}
        />

        <Button className={css.cancelBtn} text="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}
