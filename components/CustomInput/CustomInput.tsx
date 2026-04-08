import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import css from './CustomInput.module.css';
import Icon from '../Icon/Icon';

interface Props {
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'date' | 'time';
}


export const CustomInput = forwardRef<HTMLDivElement, Props>(
  ({ value, onClick, onChange, type }, ref) => {
    
    
    const mask = type === 'date' ? '00/00/0000' : '00:00:00';

    return (
      <div className={css.inputWrapper} ref={ref}>
        <IMaskInput
          mask={mask}
          unmask={false} 
          value={value}
          className={css.customInput}
          onChange={onChange} 
          onClick={onClick}
          placeholder={type === 'date' ? 'mm/dd/yyyy' : '00:00:00'}
        />
        <div className={css.iconWrapper} onClick={onClick}>
          <Icon 
            name={type === 'date' ? 'icon-calendar' : 'icon-clock'} 
            className={css.icon} 
            size={18} 
          />
        </div>
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';