import { forwardRef } from 'react';
import css from './CustomInputSearch.module.css';

interface Props {
  value?: string;
  onClick?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: 'date' | 'time';
}

export const CustomInputSearch = forwardRef<HTMLInputElement, Props>(
  ({ value, onClick, type, onChange, ...rest }, ref) => {
    
    return (
      <div className={css.dateBox} onClick={onClick}>
        <input
          {...rest} 
          ref={ref}
          className={css.searchDate}
          value={value || ''}
          onChange={onChange}
          placeholder={type === 'date' ? 'dd-mm-yyyy' : '00:00'}
          maxLength={10}
        />
        <svg className={css.searchIconDate} width={20} height={20}>
          <use href="/icons/sprite.svg#icon-calendar"></use>
        </svg>
      </div>
    );
  }
);

CustomInputSearch.displayName = 'CustomInputSearch';