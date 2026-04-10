'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/Button/Button';
import type { Currency, UpdateUserRequest } from '@/lib/api/types/user.types';

import AvatarCropper from './AvatarCropper';
import css from './UserSetsModal.module.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UserSetsModalProps {
  name: string;
  currency: string;
  avatarUrl?: string | null;
  onClose: () => void;
  onSave: (payload: UpdateUserRequest) => Promise<void>;
  onUploadAvatar: (file: File) => Promise<string | null | undefined>;
  onRemoveAvatar: () => Promise<void>;
  isSaving: boolean;
}

export default function UserSetsModal({
  name,
  currency,
  avatarUrl,
  onClose,
  onSave,
  onUploadAvatar,
  onRemoveAvatar,
  isSaving,
}: UserSetsModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formName, setFormName] = useState(name);
  const [formCurrency, setFormCurrency] = useState<Currency>(
    currency as Currency,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    avatarUrl ?? null,
  );
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropFileName, setCropFileName] = useState('');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [error, setError] = useState('');

  const currencyOptions = [
    { value: 'uah' as Currency, label: '₴ UAH' },
    { value: 'usd' as Currency, label: '$ USD' },
    { value: 'eur' as Currency, label: '€ EUR' },
  ];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isCurrencyOpen) {
          setIsCurrencyOpen(false);
          return;
        }

        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCurrencyOpen, onClose]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const displayAvatar = previewUrl;

  const handleBackdropClick = () => {
    setIsCurrencyOpen(false);
    onClose();
  };

  const handleAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    setCropSrc(URL.createObjectURL(file));
    setCropFileName(file.name);
  };

  const handleCropConfirm = async (croppedFile: File) => {
    if (cropSrc) {
      URL.revokeObjectURL(cropSrc);
      setCropSrc(null);
    }

    try {
      const uploadedUrl = await onUploadAvatar(croppedFile);

      if (uploadedUrl) {
        setPreviewUrl(uploadedUrl);

        await queryClient.invalidateQueries({ queryKey: ['current-user'] });

        toast.success('Avatar updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload avatar. Please try again.');
      console.error(err);
    }

    setPendingFile(null);
  };

  const handleCropCancel = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarRemove = async () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setPendingFile(null);
    setPreviewUrl(null);
    await onRemoveAvatar();
  };

  const selectedCurrencyLabel =
    currencyOptions.find(option => option.value === formCurrency)?.label ??
    formCurrency;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formName.trim()) {
      setError('Name is required.');
      return;
    }

    setError('');

    await onSave({
      name: formName.trim(),
      currency: formCurrency,
    });

    await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    router.refresh();
  };

  return (
    <>
      {cropSrc ? (
        <AvatarCropper
          imageSrc={cropSrc}
          fileName={cropFileName}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      ) : null}
      <div
        className={css.backdrop}
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div className={css.modal} onClick={event => event.stopPropagation()}>
          <div className={css.header}>
            <h2 className={css.title}>Profile settings</h2>
            <button
              type="button"
              className={css.closeButton}
              aria-label="Close profile settings"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <div className={css.avatarSection}>
            <span className={css.avatar}>
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={formName}
                  className={css.avatarImage}
                />
              ) : (
                <svg className={css.avatarPlaceholder} aria-hidden="true">
                  <use href="/icons/sprite.svg#icon-user" />
                </svg>
              )}
            </span>

            <div className={css.avatarActions}>
              <button
                type="button"
                className={css.avatarButton}
                onClick={handleAvatarUpload}
              >
                Upload new photo
              </button>
              <button
                type="button"
                className={css.avatarButton}
                onClick={handleAvatarRemove}
              >
                Remove
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarSelect}
            />
          </div>

          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.row}>
              <div className={css.field}>
                <div className={css.selectWrap}>
                  <button
                    type="button"
                    className={css.selectButton}
                    aria-haspopup="listbox"
                    aria-expanded={isCurrencyOpen}
                    onClick={() => setIsCurrencyOpen(value => !value)}
                  >
                    <span>{selectedCurrencyLabel}</span>
                    <svg
                      className={
                        isCurrencyOpen
                          ? `${css.selectIcon} ${css.selectIconOpen}`
                          : css.selectIcon
                      }
                      aria-hidden="true"
                    >
                      <use href="/icons/sprite.svg#icon-chevron-down" />
                    </svg>
                  </button>

                  {isCurrencyOpen ? (
                    <div className={css.selectDropdown} role="listbox">
                      {currencyOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          className={
                            option.value === formCurrency
                              ? `${css.selectOption} ${css.selectOptionActive}`
                              : css.selectOption
                          }
                          onClick={() => {
                            setFormCurrency(option.value);
                            setIsCurrencyOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={css.field}>
                <input
                  className={css.input}
                  value={formName}
                  onChange={event => setFormName(event.target.value)}
                  placeholder="Your name"
                />
              </div>
            </div>

            {error ? <p className={css.error}>{error}</p> : null}

            <Button
              type="submit"
              text={isSaving ? 'Saving...' : 'Save'}
              className={css.saveButton}
              disabled={isSaving}
            />
          </form>
        </div>
      </div>
    </>
  );
}
