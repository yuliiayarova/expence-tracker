"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { UpdateUserRequest } from "@/lib/api/user/user.types";

import css from "./UserSetsModal.module.css";

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formName, setFormName] = useState(name);
  const [formCurrency, setFormCurrency] = useState(currency);
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl ?? null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [error, setError] = useState("");

  const currencyOptions = [
    { value: "UAH", label: "₴ UAH" },
    { value: "USD", label: "$ USD" },
    { value: "EUR", label: "€ EUR" },
  ];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isCurrencyOpen) {
          setIsCurrencyOpen(false);
          return;
        }

        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isCurrencyOpen, onClose]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const displayAvatar = useMemo(() => previewUrl || avatarUrl || null, [avatarUrl, previewUrl]);

  const handleBackdropClick = () => {
    setIsCurrencyOpen(false);
    onClose();
  };

  const handleAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    if (!pendingFile) {
      fileInputRef.current?.click();
      return;
    }

    const uploadedUrl = await onUploadAvatar(pendingFile);
    setPendingFile(null);
    setPreviewUrl(uploadedUrl ?? previewUrl);
  };

  const handleAvatarRemove = async () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPendingFile(null);
    setPreviewUrl(null);
    await onRemoveAvatar();
  };

  const selectedCurrencyLabel =
    currencyOptions.find((option) => option.value === formCurrency)?.label ?? formCurrency;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formName.trim()) {
      setError("Name is required.");
      return;
    }

    setError("");

    if (pendingFile) {
      const uploadedUrl = await onUploadAvatar(pendingFile);
      setPendingFile(null);
      setPreviewUrl(uploadedUrl ?? previewUrl);
    }

    await onSave({
      name: formName.trim(),
      currency: formCurrency,
    });
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick} role="presentation">
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
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
              <img src={displayAvatar} alt={formName} className={css.avatarImage} />
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
                  onClick={() => setIsCurrencyOpen((value) => !value)}
                >
                  <span>{selectedCurrencyLabel}</span>
                  <svg
                    className={
                      isCurrencyOpen ? `${css.selectIcon} ${css.selectIconOpen}` : css.selectIcon
                    }
                    aria-hidden="true"
                  >
                    <use href="/icons/sprite.svg#icon-chevron-down" />
                  </svg>
                </button>

                {isCurrencyOpen ? (
                  <div className={css.selectDropdown} role="listbox">
                    {currencyOptions.map((option) => (
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
                onChange={(event) => setFormName(event.target.value)}
                placeholder="Your name"
              />
            </div>
          </div>

          {error ? <p className={css.error}>{error}</p> : null}

          <button type="submit" className={css.saveButton} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
