'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
import Icon from '../Icon/Icon';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  isModal?: boolean;
}

export default function Modal({
  children,
  onClose,
  className,
  isModal,
}: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={`${css.modal}${className ? ` ${className}` : ''}`}>
        <button
          type="button"
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          <Icon name="icon-close" />
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}
