'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState /*useEffect, useRef */ } from 'react';
import { useTransactionStore } from '@/lib/store/transactionStore';
import {
  useQuery /*useMutation, useQueryClient*/,
} from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';
import clsx from 'clsx';
// import { updateTransaction } from '@/lib/api/client/transactions/transactionApi';
// import { Transaction } from '@/lib/api/types/transaction.types';
import { getCategories } from '@/lib/api/client/categories/categoryApi';
import type {
  CategoriesResponse,
  Category,
} from '@/lib/api/types/category.types';
import { CreateTransactionRequest } from '@/lib/api/types/transaction.types';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import Button from '../Button/Button';
import css from './TransactionForm.module.css';

/*let iziToastCssLoaded = false;
const showToast = (
  type: 'success' | 'error',
  title: string,
  message: string,
) => {
  if (!iziToastCssLoaded) {
    import('izitoast/dist/css/iziToast.min.css');
    iziToastCssLoaded = true;
  }
  import('izitoast').then(mod => {
    mod.default[type]({ title, message, position: 'topRight' });
  });
};*/

// interface TransactionFormProps {
//   transaction: CreateTransactionRequest;
//   onClose: () => void;
// }

const validationSchema = Yup.object({
  typeTransaction: Yup.string()
    .oneOf(['expense', 'income'])
    .required('Choose transaction type'),
  dateTransaction: Yup.date()
    .max(new Date(), 'Error date')
    .required('Date is required'),
  timeTransaction: Yup.date()
    .max(new Date(), 'Error date')
    .required('Time is required'),
  categoryTransaction: Yup.string().required('Category is required'),
  sumTransaction: Yup.number()
    .typeError('Sum must be a number')
    .positive('Sum must be positive')
    .required('Sum is required'),
  commentTransaction: Yup.string().max(
    50,
    'Comment must contain at no more 50 letters',
  ),
});

export default function TransactionForm(/*{
  transaction,
  onClose,
}: TransactionFormProps/**/) {
  // const [groupCategories, setGroupCategories] = useState<
  //   'expenses' | 'incomes'
  // >('expenses');
  // const [category, setCategory] = useState<Category[]>([]);
  // const categoriesResponse: CategoriesResponse = {
  //   incomes: useTransactionStore(state => state.incomes),
  //   expenses: useTransactionStore(state => state.expences),
  // };
  const { expences, incomes, setExpenses, setIncomes } = useTransactionStore();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOpenModalCategories = () => {
    setIsCategoriesOpen(true);
  };
  const handleCloseModalCategories = () => {
    setIsCategoriesOpen(false);
  };
  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
    setIsCategoriesOpen(false);
  }; /**/

  // const queryClient = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  /*const mutation = useMutation({
    mutationFn: (values: Transaction) => updateTransaction(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', 'expense'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', 'income'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      showToast('success', 'Updated', 'Transaction updated successfully');
      onClose();
    },
    onError: () => {
      showToast('error', 'Error', 'Failed to update transaction');
    },
  });/**/

  const initialValues: CreateTransactionRequest = {
    type: 'expenses',
    date: '',
    time: '',
    category: '',
    sum: 0,
    comment: '',
  };

  const handleSubmit = (values: CreateTransactionRequest) => {
    console.log('Form submitted:', values);
    // mutation.mutate(values);
  };

  return (
    <div className={css['container-form']}>
      <Formik
        className={css['container-form']}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className={css['transaction-form']}>
            <div className={css['transaction-groop-container']}>
              <label className={css['transaction-label-radio']}>
                <Field
                  type="radio"
                  name="type"
                  value="expenses"
                  className={css['visually-hidden']}
                />
                <span className={css.borderGreen}>
                  <span className={css.inCircle}></span>
                </span>
                Expense
              </label>
              <label className={css['transaction-label-radio']}>
                <Field
                  type="radio"
                  name="type"
                  value="incomes"
                  className={css['visually-hidden']}
                />
                <span className={css.borderGreen}>
                  <span className={css.inCircle}></span>
                </span>
                Income
              </label>
              <ErrorMessage
                name="type"
                component="span"
                className={css['text-error']}
              />
            </div>
            <div className={css['transaction-groop-container']}>
              <div className={css['transaction-groop-item']}>
                <label className={css['transaction-label']} htmlFor="date">
                  Date
                </label>
                <DatePicker
                  name="date"
                  id="date"
                  className={clsx(
                    css['transaction-input'],
                    errors.date && touched.date && css['text-error'],
                  )}
                  calendarClassName={css['transaction-datetime-background']}
                  selected={values.date ? new Date(values.date) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const dateString = format(date, 'MM/dd/yyyy');
                      setFieldValue('date', dateString);
                    } else {
                      setFieldValue('date', '');
                    }
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="mm/dd/yyyy"
                />
                <ErrorMessage
                  name="date"
                  component="span"
                  className={css['text-error']}
                />
              </div>
              <div className={css['transaction-groop-item']}>
                <label className={css['transaction-label']} htmlFor="time">
                  Time
                </label>
                <DatePicker
                  id="time"
                  name="time"
                  selected={
                    values.time
                      ? parse(values.time, 'HH:mm:ss', new Date())
                      : null
                  }
                  onChange={(time: Date | null) => {
                    const timeString = time ? format(time, 'HH:mm:ss') : '';
                    setFieldValue('time', timeString);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="HH:mm:ss"
                  dateFormat="HH:mm:ss"
                  placeholderText="00:00:00"
                  className={css['transaction-input']}
                  timeClassName={() => css['transaction-datetime-background']}
                />
                <ErrorMessage
                  name="time"
                  component="span"
                  className={css['text-error']}
                />
              </div>
            </div>
            <div className={css['transaction-groop']}>
              <label className={css['transaction-label']} htmlFor="category">
                Category
              </label>
              <Field
                name="category"
                id="category"
                placeholder="Different"
                value={values.category}
                className={css['transaction-input']}
                onClick={() => setIsCategoriesOpen(true)}
                readOnly
              />
              <ErrorMessage
                name="category"
                component="span"
                className={css['text-error']}
              />
            </div>
            <div className={css['transaction-groop']}>
              <label className={css['transaction-label']} htmlFor="sum">
                Sum
              </label>
              <div className={css['field-wrapper']}>
                <Field
                  type="number"
                  name="sum"
                  id="sum"
                  placeholder="Enter the sum"
                  className={clsx(
                    // css['transaction-input'],
                    css['transaction-input-sum'],
                    errors.sum && touched.sum && css['input-error'],
                  )}
                />
                <span className={css['field-wrapper-suffix']}>UAH</span>
              </div>
              <ErrorMessage
                name="sum"
                component="span"
                className={css['text-error']}
              />
            </div>
            <div className={css['transaction-groop']}>
              <label className={css['transaction-label']} htmlFor="comment">
                Comment
              </label>
              <Field
                as="textarea"
                name="comment"
                id="comment"
                rows="5"
                placeholder="Enter the text"
                className={clsx(
                  css['transaction-input'],
                  css['transaction-textarea'],
                  errors.sum && touched.sum && css['input-error'],
                )}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css['text-error']}
              />
            </div>
            <Button
              text="Add"
              type="submit"
              className={css['transaction-submit']}
            />
            {isCategoriesOpen && (
              <CategoriesModal
                onClose={() => setIsCategoriesOpen(false)}
                onSelectCategory={catName => setFieldValue('category', catName)}
                group={values.type}
                categories={values.type === 'expenses' ? expences : incomes}
                setCategories={
                  values.type === 'expenses' ? setExpenses : setIncomes
                }
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
