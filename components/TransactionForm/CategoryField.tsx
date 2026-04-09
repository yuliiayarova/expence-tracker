'use client';

import { useEffect, useState } from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';

import CategoriesModal from '../CategoriesModal/CategoriesModal';
import { getCategories } from '@/lib/api/client/categories/categoryApi';

import type { Category } from '@/lib/api/types/category.types';
import type { TransactionFormValues } from '@/lib/api/client/transactions/transactionForm.config';

import css from './CategoryField.module.css';

interface Props {
  inputId: string;
}

export default function CategoryField({ inputId }: Props) {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<TransactionFormValues>();

  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!values.category) return;

    const categories = data?.[values.type] ?? [];

    const currentCategory = categories.find(
      category => category._id === values.category,
    );

    if (!currentCategory) {
      if (values.category || values.categoryName) {
        setFieldValue('category', '');
        setFieldValue('categoryName', '');
      }
      return;
    }

    if (values.categoryName !== currentCategory.categoryName) {
      setFieldValue('categoryName', currentCategory.categoryName);
    }
  }, [data, values.type, values.category, values.categoryName, setFieldValue]);

  return (
    <>
      <div className={css.categoryFieldset}>
        <label className={css.categoryLabel} htmlFor={inputId}>
          Category
        </label>

        <input
          id={inputId}
          type="text"
          readOnly
          value={values.categoryName || ''}
          placeholder="Different"
          className={`${css.categoryInput} ${
            errors.category && touched.category ? css.inputError : ''
          }`}
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
        />

        <ErrorMessage name="category" component="span" className={css.error} />
      </div>

      {isOpen && (
        <CategoriesModal
          type={values.type}
          onClose={() => setIsOpen(false)}
          onSelectCategory={(category: Category) => {
            setFieldValue('category', category._id);
            setFieldValue('categoryName', category.categoryName);
          }}
        />
      )}
    </>
  );
}
