'use client';

import { useState } from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import type { Category } from '@/lib/api/types/category.types';
import type { TransactionFormValues } from '@/lib/api/client/transactions/transactionForm.config';
import css from './TransactionForm.module.css';

interface Props {
  inputId: string;
}

export default function CategoryField({ inputId }: Props) {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<TransactionFormValues>();

  const [isOpen, setIsOpen] = useState(false);

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
          placeholder="Select category"
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
