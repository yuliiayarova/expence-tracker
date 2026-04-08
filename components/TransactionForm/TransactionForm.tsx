'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './TransactionForm.module.css';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { useId } from 'react';
import * as Yup from 'yup';
// import { createTransaction } from '@/lib/api/client/transactions/transactionApi';

interface TransactionFormValues {
  type: 'incomes' | 'expenses';
  date: string;
  time: string;
  category: string;
  sum: number | '';
  comment: string;
}

const now = new Date();
const pad = (num: number) => num.toString().padStart(2, '0');

const initialValues: TransactionFormValues = {
  type: 'expenses',
  date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
  category: '',
  sum: '',
  comment: '',
};

export const transactionSchema = Yup.object({
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

export default function TransactionForm() {
  const id = useId();

  //   const handleSubmit = async (
  //     values: TransactionFormValues,
  //     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  //   ) => {
  //     try {
  //       await createTransaction(values);

  //       const transaction = await getTransactions();
  //       setUser(user);

  //       router.replace('/transactions/expenses');
  //     } catch (error) {
  //       const axiosError = error as AxiosError<ErrorResponse>;

  //       toast.error(
  //         axiosError.response?.data?.response?.message ??
  //           axiosError.response?.data?.message ??
  //           axiosError.response?.data?.error ??
  //           axiosError.message ??
  //           'Oops... some error',
  //       );
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  const handleSubmit = () => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={transactionSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.transactionWrapper}>
            <div className={css.transactionFieldset}>
              <label className={css.transactionLabel} htmlFor={`${id}-expense`}>
                Expense
              </label>
              <Field
                id={`${id}-expense`}
                type="radio"
                name="transaction"
                value="expense"
                className={css.transactionInput}
              />
            </div>
            <div className={css.transactionFieldset}>
              <label className={css.transactionLabel} htmlFor={`${id}-income`}>
                Income
              </label>
              <Field
                id={`${id}-income`}
                type="radio"
                name="transaction"
                value="income"
                className={css.transactionInput}
              />
            </div>
          </div>

          <div className="dateTimeWrapper">
            <div className={css.dateFieldset}>
              <label className={css.dateLabel} htmlFor={`${id}-date`}>
                Date
              </label>
              <Field
                id={`${id}-date`}
                type="date"
                name="date"
                className={css.dateInput}
              />
            </div>

            <div className={css.timeFieldset}>
              <label className={css.timeLabel} htmlFor={`${id}-time`}>
                Time
              </label>
              <Field
                id={`${id}-time`}
                type="time"
                name="time"
                className={css.timeInput}
              />
            </div>
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
              <option value="different">Different</option>
            </Field>
          </div>

          <div className={css.sumFieldset}>
            <label className={css.sumLabel} htmlFor={`${id}-sum`}>
              Sum
            </label>
            <Field
              id={`${id}-sum`}
              type="number"
              name="sum"
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
              as="textaria"
              id={`${id}-comment`}
              name="comment"
              placeholder="Enter the text"
              className={`${css.commentInput} ${
                errors.comment && touched.comment ? css.inputError : ''
              }`}
            />
            <ErrorMessage name="sum" component="span" className={css.error} />
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
