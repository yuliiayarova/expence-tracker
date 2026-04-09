'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Loader from '@/components/Loader/Loader';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/api/client/categories/categoryApi';
import type {
  Category,
  CategoriesResponse,
} from '@/lib/api/types/category.types';
import css from './CategoriesModal.module.css';

const MIN_LENGTH = 2;
const MAX_LENGTH = 16;

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Something went wrong.'
    );
  }
  return 'Something went wrong.';
}

function validate(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return 'Category name is required.';
  if (trimmed.length < MIN_LENGTH) return `Minimum ${MIN_LENGTH} characters.`;
  if (trimmed.length > MAX_LENGTH) return `Maximum ${MAX_LENGTH} characters.`;
  return '';
}

interface CategoriesModalProps {
  type: 'incomes' | 'expenses';
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
}

export default function CategoriesModal({
  type,
  onClose,
  onSelectCategory,
}: CategoriesModalProps) {
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  });

  const categories: Category[] = data?.[type] ?? [];

  const addMutation = useMutation({
    mutationFn: (name: string) => createCategory({ type, categoryName: name }),
    onSuccess: newCategory => {
      queryClient.setQueryData<CategoriesResponse>(['categories'], old => {
        if (!old) return old;
        return { ...old, [type]: [...old[type], newCategory] };
      });
      setInputValue('');
    },
    onError: error => toast.error(getErrorMessage(error)),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, { categoryName: name }),
    onSuccess: async updated => {
      queryClient.setQueryData<CategoriesResponse>(['categories'], old => {
        if (!old) return old;
        return {
          ...old,
          [type]: old[type].map(c =>
            c._id === updated._id
              ? { ...c, categoryName: updated.categoryName }
              : c,
          ),
        };
      });
      await queryClient.invalidateQueries({
        queryKey: ['current-month-stats'],
      });
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setInputValue('');
      setEditingCategory(null);
    },
    onError: error => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: async (_, id) => {
      queryClient.setQueryData<CategoriesResponse>(['categories'], old => {
        if (!old) return old;
        return { ...old, [type]: old[type].filter(c => c._id !== id) };
      });
      await queryClient.invalidateQueries({
        queryKey: ['current-month-stats'],
      });
      if (editingCategory?._id === id) {
        setEditingCategory(null);
        setInputValue('');
      }
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error(
          'Cannot delete: this category is already in use by transactions.',
        );
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  const isActionsPending =
    addMutation.isPending || editMutation.isPending || deleteMutation.isPending;
  const isFormPending = addMutation.isPending || editMutation.isPending;

  const handleEditStart = (category: Category) => {
    setEditingCategory(category);
    setInputValue(category.categoryName);
    setInputError('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setInputValue('');
    setInputError('');
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const error = validate(inputValue);
    if (error) {
      setInputError(error);
      return;
    }
    setInputError('');

    if (editingCategory) {
      editMutation.mutate({ id: editingCategory._id, name: inputValue.trim() });
    } else {
      addMutation.mutate(inputValue.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputError) setInputError('');
  };

  const title = type === 'incomes' ? 'Incomes' : 'Expenses';

  return (
    <Modal onClose={onClose} className={css.modalOverride}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.subtitle}>All Category</p>

      {isLoading ? (
        <Loader size="medium" />
      ) : (
        <div className={css.listWrapper}>
          <ul className={css.list}>
            {categories.map(category => (
              <li key={category._id} className={css.item}>
                <span className={css.categoryName}>
                  {category.categoryName}
                </span>

                <div className={css.actions}>
                  <button
                    type="button"
                    className={css.actionBtn}
                    aria-label={`Select ${category.categoryName}`}
                    disabled={isActionsPending}
                    onClick={() => {
                      onSelectCategory(category);
                      onClose();
                    }}
                  >
                    <Icon name="icon-check" size={16} />
                  </button>

                  <button
                    type="button"
                    className={css.actionBtn}
                    aria-label={`Edit ${category.categoryName}`}
                    disabled={isActionsPending}
                    onClick={() => handleEditStart(category)}
                  >
                    <Icon name="icon-edit" size={16} />
                  </button>

                  <button
                    type="button"
                    className={css.actionBtn}
                    aria-label={`Delete ${category.categoryName}`}
                    disabled={isActionsPending}
                    onClick={() => deleteMutation.mutate(category._id)}
                  >
                    <Icon name="icon-trash" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className={css.newCategoryLabel}>New Category</p>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.inputContainer}>
          <input
            className={`${css.addInput} ${inputError ? css.addInputError : ''}`}
            placeholder="Enter the text"
            value={inputValue}
            onChange={handleInputChange}
          />
          {isFormPending ? (
            <div className={css.loaderWrap}>
              <Loader size="small" />
            </div>
          ) : (
            <Button
              type="submit"
              text={editingCategory ? 'Edit' : 'Add'}
              disabled={isActionsPending}
              className={css.addBtn}
            />
          )}
        </div>
        {inputError && <span className={css.errorMsg}>{inputError}</span>}
        {editingCategory && (
          <button
            type="button"
            className={css.cancelBtn}
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </Modal>
  );
}
