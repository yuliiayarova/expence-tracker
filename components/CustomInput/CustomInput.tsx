import { forwardRef } from 'react';
import css from './CustomInput.module.css';
import Icon from '../Icon/Icon';

interface Props {
  value?: string;
  onClick?: () => void;
  type: 'date' | 'time';
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onClick, type }, ref) => {
    return (
      <div className={css.inputWrapper}>
        <input
          ref={ref}
          type="text"
          value={value || ''}
          onClick={onClick}
          readOnly
          className={css.customInput}
          placeholder={type === 'date' ? 'yyyy-mm-dd' : '00:00'}
        />
        <button type="button" className={css.iconWrapper} onClick={onClick}>
          <Icon
            name={type === 'date' ? 'icon-calendar' : 'icon-clock'}
            className={css.icon}
            size={18}
          />
        </button>
      </div>
    );
  },
);

CustomInput.displayName = 'CustomInput';
