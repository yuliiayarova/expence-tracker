'use client';

import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import css from './TransactionForm.module.css';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { useId } from 'react';
import * as Yup from 'yup';
import { DatePickerGroup } from '../DatePickerGroup/DatePickerGroup';
import {
  createTransaction,
  updateTransaction,
} from '@/lib/api/client/transactions/transactionApi';
import { useTransactionDraftStore } from '@/lib/store/transactionStore';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import {
  getInitialTransactionValues,
  TransactionFormValues,
} from '@/lib/api/client/transactions/transactionForm.config';
import PersistTransactionDraft from './PersistTransactionDraft';
import CategoryField from './CategoryField';
import { CreateTransactionRequest } from '@/lib/api/types/transaction.types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/client/user/userApi';

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

interface TransactionFormProps {
  mode?: 'create' | 'edit';
  initialData?: {
    id: string;
    type: 'incomes' | 'expenses';
    category: string;
    categoryId: string;
    comment: string;
    date: string;
    time: string;
    sum: number;
  } | null;
  onClose?: () => void;
}

export default function TransactionForm({
  mode = 'create',
  initialData = null,
  onClose,
}: TransactionFormProps) {
  const { draft, clearDraft } = useTransactionDraftStore();
  const id = useId();
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    
  });
  const currencySymbol = userData?.currency?.toUpperCase() || 'UAH';

  const handleSubmit = async (
    values: TransactionFormValues,
    { setSubmitting, resetForm }: FormikHelpers<TransactionFormValues>,
  ) => {
    try {
      const payload: CreateTransactionRequest = {
        type: values.type,
        date: values.date,
        time: values.time,
        category: values.category,
        sum: Number(values.sum),
        comment: values.comment.trim() || undefined,
      };
      const updatePayload = {
        date: values.date,
        time: values.time,
        category: values.category,
        sum: Number(values.sum),
        comment: values.comment.trim() || undefined,
      };
      // await createTransaction(payload);
      if (mode === 'edit' && initialData) {
        await updateTransaction(values.type, initialData.id, updatePayload);
        toast.success('Transaction successfully updated');
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        onClose?.();
      } else {
        await createTransaction(payload);
        toast.success('Transaction successfully added');

        const freshInitialValues = getInitialTransactionValues();
        clearDraft();
        resetForm({ values: freshInitialValues });
      }

      // toast.success('Transaction successfully added');

      // const freshInitialValues = getInitialTransactionValues();

      // clearDraft();
      // resetForm({ values: freshInitialValues });
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
  const initialValues = initialData
    ? {
        type: initialData.type,
        date: initialData.date,
        time: initialData.time,
        category: initialData.categoryId,
        categoryName: initialData.category,
        sum: initialData.sum,
        comment: initialData.comment,
      }
    : draft;
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={transactionSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <PersistTransactionDraft />
          <div className={css.transactionWrapper}>
            <div className={css.transactionFieldset}>
              <Field name="type">
                {({
                  field,
                  form,
                }: FieldProps<TransactionFormValues['type']>) => (
                  <input
                    id={`${id}-expenses`}
                    type="radio"
                    {...field}
                    value="expenses"
                    checked={field.value === 'expenses'}
                    className={css.transactionInput}
                    onChange={() => {
                      form.setFieldValue('type', 'expenses');
                      form.setFieldValue('category', '');
                      form.setFieldValue('categoryName', '');
                    }}
                  />
                )}
              </Field>
              <span className={css.customRadio}></span>
              <label
                className={css.transactionLabel}
                htmlFor={`${id}-expenses`}
              >
                Expense
              </label>
            </div>
            <div className={css.transactionFieldset}>
              <Field name="type">
                {({
                  field,
                  form,
                }: FieldProps<TransactionFormValues['type']>) => (
                  <input
                    id={`${id}-incomes`}
                    type="radio"
                    {...field}
                    value="incomes"
                    checked={field.value === 'incomes'}
                    className={css.transactionInput}
                    onChange={() => {
                      form.setFieldValue('type', 'incomes');
                      form.setFieldValue('category', '');
                      form.setFieldValue('categoryName', '');
                    }}
                  />
                )}
              </Field>
              <span className={css.customRadio}></span>
              <label className={css.transactionLabel} htmlFor={`${id}-incomes`}>
                Income
              </label>
            </div>
            <ErrorMessage name="type" component="span" className={css.error} />
          </div>

          <div className={css.dateTimeWrapper}>
            <DatePickerGroup />
          </div>

          <CategoryField inputId={`${id}-category`} />

          <div className={css.sumFieldset}>
            <label className={css.sumLabel} htmlFor={`${id}-sum`}>
              Sum
            </label>
            <Field
              id={`${id}-sum`}
              type="text"
              inputMode="decimal"
              name="sum"
              min="1"
              max="1000000"
              placeholder="Enter the sum"
              className={`${css.sumInput} ${
                errors.sum && touched.sum ? css.inputError : ''
              }`}
            />
            <span className={css.currency}>{currencySymbol}</span>
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

          <div className={css.loadingWrapper}>
            <Button
              className={css.submitButton}
              type="submit"
              text={isSubmitting ? 'Adding...' : 'Add'}
              disabled={isSubmitting}
            />
            {isSubmitting && <Loader size="small" />}
          </div>
        </Form>
      )}
    </Formik>
  );
}
