import Icon from "../Icon/Icon";
import css from "./DecorationTab.module.css";


export default function DecorationTab() {
  return (
    <div className={css.tab}>
      <div className={css.iconContainer}>
        <Icon name="icon-arrow-up" size={18} />
      </div>
      <div className={css.textContainer}>
        <span className={css.label}>Your balance</span>
        <span className={css.value}>$632.000</span>
      </div>
    </div>
  );
};