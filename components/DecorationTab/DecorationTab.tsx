import Icon from "../Icon/Icon";
import css from "./DecorationTab.module.css";


export default function DecorationTab() {
  return (
    <div className={css.tab}>
      <div className={css.iconWrapper}>
        
        <Icon name='icon-arrow-up' size={18} />
      </div>
      <div className={css.info}>
        <p className={css.label}>Your balance</p>
        <p className={css.amount}>$632.000</p>
      </div>
      <span className={css.percentage}>+1.29%</span>
    </div>
  );
};