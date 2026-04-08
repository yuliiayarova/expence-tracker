'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import css from './TransactionForm.module.css';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { useId } from 'react';
import * as Yup from 'yup';
import { DatePickerGroup } from '../DatePickerGroup/DatePickerGroup';
import { createTransaction } from '@/lib/api/client/transactions/transactionApi';
import { useTransactionDraftStore } from '@/lib/store/transactionStore';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import {
  getInitialTransactionValues,
  TransactionFormValues,
} from '@/lib/api/client/transactions/transactionForm.config';
import PersistTransactionDraft from './PersistTransactionDraft';

const transactionSchema = Yup.object({
  type: Yup.string()
    .oneOf(['incomes', 'expenses'], 'Choose transaction type')
    .required('Transaction type is required'),

  date: Yup.string()
    .required('Choose date')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format YYYY-MM-DD'),

  time: Yup.string()
    .required('Choose time')
    .matches(/^\d{2}:\d{2}$/, 'Time must be in format HH:mm'),

  category: Yup.string()
    .required('Choose category')
    .matches(/^[a-f\d]{24}$/i, 'Invalid category'),

  sum: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .typeError('Enter a valid sum')
    .required('Sum is required')
    .integer('Sum must be an integer')
    .min(1, 'Minimum sum is 1')
    .max(1000000, 'Maximum sum is 1000000'),

  comment: Yup.string()
    .transform(value => {
      const trimmed = value?.trim();
      return trimmed === '' ? undefined : trimmed;
    })
    .min(3, 'Comment must contain at least 3 characters')
    .max(48, 'Comment must contain at most 48 characters')
    .notRequired(),
});

type ErrorResponse = {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
};

export default function TransactionForm() {
  const { draft, clearDraft } = useTransactionDraftStore();

  const id = useId();

  const handleSubmit = async (
    values: TransactionFormValues,
    { setSubmitting, resetForm }: FormikHelpers<TransactionFormValues>,
  ) => {
    try {
      const payload = {
        ...values,
        sum: Number(values.sum),
        comment: values.comment.trim() || undefined,
      };

      await createTransaction(payload);

      toast.success('Transaction successfully added');

      const freshInitialValues = getInitialTransactionValues();

      clearDraft();
      resetForm({ values: freshInitialValues });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      toast.error(
        axiosError.response?.data?.response?.message ??
          axiosError.response?.data?.message ??
          axiosError.response?.data?.error ??
          axiosError.message ??
          'Oops... some error',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={draft}
      enableReinitialize
      validationSchema={transactionSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <PersistTransactionDraft />
          <div className={css.transactionWrapper}>
            <div className={css.transactionFieldset}>
              <label
                className={css.transactionLabel}
                htmlFor={`${id}-expenses`}
              >
                Expense
              </label>
              <Field
                id={`${id}-expenses`}
                type="radio"
                name="type"
                value="expenses"
                className={css.transactionInput}
              />
            </div>
            <div className={css.transactionFieldset}>
              <label className={css.transactionLabel} htmlFor={`${id}-incomes`}>
                Income
              </label>
              <Field
                id={`${id}-incomes`}
                type="radio"
                name="type"
                value="incomes"
                className={css.transactionInput}
              />
            </div>
            <ErrorMessage name="type" component="span" className={css.error} />
          </div>

          <div className={css.dateTimeWrapper}>
            <DatePickerGroup />
          </div>

          <div className={css.categoryFieldset}>
            <label className={css.categoryLabel} htmlFor={`${id}-category`}>
              Category
            </label>
            <Field
              as="select"
              id={`${id}-category`}
              name="category"
              className={css.categoryInput}
            >
              <option value="">Select category</option>
              <option value="6522bf1f9027bb7d55d6512b">Different</option>
            </Field>
            <ErrorMessage
              name="category"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.sumFieldset}>
            <label className={css.sumLabel} htmlFor={`${id}-sum`}>
              Sum
            </label>
            <Field
              id={`${id}-sum`}
              type="number"
              name="sum"
              min="1"
              max="1000000"
              placeholder="Enter the sum"
              className={`${css.sumInput} ${
                errors.sum && touched.sum ? css.inputError : ''
              }`}
            />
            <span className={css.currency}>UAH</span>
            <ErrorMessage name="sum" component="span" className={css.error} />
          </div>

          <div className={css.commentFieldset}>
            <label className={css.commentLabel} htmlFor={`${id}-comment`}>
              Comment
            </label>
            <Field
              as="textarea"
              id={`${id}-comment`}
              name="comment"
              placeholder="Enter the text"
              className={`${css.commentInput} ${
                errors.comment && touched.comment ? css.inputError : ''
              }`}
            />
            <ErrorMessage
              name="comment"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <div className={css.loadingWrapper}>
              <Button
                className={css.submitButton}
                type="submit"
                text={isSubmitting ? 'Adding...' : 'Add'}
                disabled={isSubmitting}
              />
              {isSubmitting && <Loader size="small" />}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
