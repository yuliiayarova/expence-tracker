'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';
import clsx from 'clsx';
import { updataTransaction, TransactionGetRes } from './api/transactionApi';
import { getCategories } from './api/categoryApi';
import type { CategoryType, Category } from './typs/categoryType';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import Button from '../Button/Button';
import css from './TransactionForm.module.css';
import { Transaction } from './typs/transactionType';

/*type Category = {
  id: string;
  name: string;
};

const validationSchema = Yup.object({
  typeTransaction: Yup.string().required('Choose transaction type'),
  dateTransaction: Yup.date()
    .max(new Date(), 'Error date')
    .required('Date is required'),
  timeTransaction: Yup.date()
    .max(new Date(), 'Error date')
    .required('Date is required'),
  // timeTransaction: Yup.string()
  //   .matches(
  //     /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  //     'Format should be hh:mm:ss',
  //   )
  //   .required('Time is required'),
  categoryTransaction: Yup.string(),
  sumTransaction: Yup.number()
    .typeError('Sum must be a number')
    .positive('Sum must be positive')
    .required('Sum is required'),
  commentTransaction: Yup.string().min(
    5,
    'Comment must contain at least 5 letters',
  ),
  // .required('Comment is required'),
});

const initialValues = {
  typeTransaction: 'expense',
  dateTransaction: '',
  timeTransaction: '',
  categoryTransaction: '',
  sumTransaction: '',
  commentTransaction: '',
};/**/
let iziToastCssLoaded = false;
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
};

interface TransactionFormProps {
  transaction: TransactionGetRes;
  onClose: () => void;
}

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

export default function TransactionForm({
  transaction,
  onClose,
}: TransactionFormProps) {
  /*// const [transactionType, setTransactionType] =
  //   useState<TypeTransaction>('expense');*/
  const [groupCategories, setGroupCategories] =
    useState<CategoryType>('expense');
  const [category, setCategory] = useState<Category[]>([]);
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

  const queryClient = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const mutation = useMutation({
    mutationFn: (values: Transaction) =>
      updataTransaction({
        _idTransaction: transaction._idTransaction,
        originalType: values.typeTransaction,
        typeTransaction: values.typeTransaction,
        dateTransaction: values.dateTransaction,
        timeTransaction: values.timeTransaction,
        categoryTransaction: values.categoryTransaction,
        sumTransaction: values.sumTransaction,
        commentTransaction: values.commentTransaction,
      }),
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
  });

  const initialValues: Transaction = {
    typeTransaction: transaction.typeTransaction,
    dateTransaction: transaction.dateTransaction,
    timeTransaction: transaction.timeTransaction,
    categoryTransaction: transaction.categoryTransaction.categoryName,
    sumTransaction: transaction.sumTransaction,
    commentTransaction: transaction.commentTransaction ?? '',
  };

  const handleSubmit = (values: Transaction) => {
    console.log('Form submitted:', values);
    mutation.mutate(values);
  };

  return (
    <div className={css['container-form']}>
      <Formik
        className={css['container-form']}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const groupCategories =
            values.typeTransaction === 'income'
              ? (categories?.income ?? [])
              : (categories?.expense ?? []);
          // setCategory(groupCategories);
          setGroupCategories(values.typeTransaction);
          return (
            <Form className={css['transaction-form']}>
              <div className={css['transaction-groop-container']}>
                <label className={css['transaction-label-radio']}>
                  <Field
                    type="radio"
                    name="typeTransaction"
                    value="expense"
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
                    name="typeTransaction"
                    value="income"
                    className={css['visually-hidden']}
                  />
                  <span className={css.borderGreen}>
                    <span className={css.inCircle}></span>
                  </span>
                  Income
                </label>
                <ErrorMessage
                  name="typeTransaction"
                  component="span"
                  className={css['text-error']}
                />
              </div>
              <div className={css['transaction-groop-container']}>
                <div className={css['transaction-groop-item']}>
                  <label
                    className={css['transaction-label']}
                    htmlFor="dateTransaction"
                  >
                    Date
                  </label>
                  <DatePicker
                    name="dateTransaction"
                    id="dateTransaction"
                    className={clsx(
                      css['transaction-input'],
                      errors.dateTransaction &&
                        touched.dateTransaction &&
                        css['text-error'],
                    )}
                    calendarClassName={css['transaction-datetime-background']}
                    selected={
                      values.dateTransaction
                        ? new Date(values.dateTransaction)
                        : null
                    }
                    onChange={(date: Date | null) => {
                      if (date) {
                        const dateString = format(date, 'MM/dd/yyyy');
                        setFieldValue('dateTransaction', dateString);
                      } else {
                        setFieldValue('dateTransaction', '');
                      }
                    }}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="mm/dd/yyyy"
                  />
                  <ErrorMessage
                    name="dateTransaction"
                    component="span"
                    className={css['text-error']}
                  />
                </div>
                <div className={css['transaction-groop-item']}>
                  <label
                    className={css['transaction-label']}
                    htmlFor="timeTransaction"
                  >
                    Time
                  </label>
                  <DatePicker
                    id="timeTransaction"
                    name="timeTransaction"
                    selected={
                      values.timeTransaction
                        ? parse(values.timeTransaction, 'HH:mm:ss', new Date())
                        : null
                    }
                    onChange={(time: Date | null) => {
                      const timeString = time ? format(time, 'HH:mm:ss') : '';
                      setFieldValue('timeTransaction', timeString);
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
                    name="timeTransaction"
                    component="span"
                    className={css['text-error']}
                  />
                </div>
              </div>
              <div className={css['transaction-groop']}>
                <label
                  className={css['transaction-label']}
                  htmlFor="categoryTransaction"
                >
                  Category
                </label>
                <Field
                  name="categoryTransaction"
                  id="categoryTransaction"
                  placeholder="Different"
                  value={selectedCategory || ''}
                  className={css['transaction-input']}
                  onClick={handleOpenModalCategories}
                  readOnly
                />
                <ErrorMessage
                  name="categoryTransaction"
                  component="span"
                  className={css['text-error']}
                />
              </div>
              <div className={css['transaction-groop']}>
                <label
                  className={css['transaction-label']}
                  htmlFor="sumTransaction"
                >
                  Sum
                </label>
                <div className={css['field-wrapper']}>
                  <Field
                    type="number"
                    name="sumTransaction"
                    id="sumTransaction"
                    placeholder="Enter the sum"
                    className={clsx(
                      // css['transaction-input'],
                      css['transaction-input-sum'],
                      errors.sumTransaction &&
                        touched.sumTransaction &&
                        css['input-error'],
                    )}
                  />
                  <span className={css['field-wrapper-suffix']}>UAH</span>
                </div>
                <ErrorMessage
                  name="sumTransaction"
                  component="span"
                  className={css['text-error']}
                />
              </div>
              <div className={css['transaction-groop']}>
                <label
                  className={css['transaction-label']}
                  htmlFor="commentTransaction"
                >
                  Comment
                </label>
                <Field
                  as="textarea"
                  name="commentTransaction"
                  id="commentTransaction"
                  rows="5"
                  placeholder="Enter the text"
                  className={clsx(
                    css['transaction-input'],
                    css['transaction-textarea'],
                    errors.sumTransaction &&
                      touched.sumTransaction &&
                      css['input-error'],
                  )}
                />
                <ErrorMessage
                  name="commentTransaction"
                  component="span"
                  className={css['text-error']}
                />
              </div>
              <Button
                text="Add"
                type="submit"
                className={css['transaction-submit']}
              />
            </Form>
          );
        }}
      </Formik>
      {isCategoriesOpen && (
        <CategoriesModal
          onClose={handleCloseModalCategories}
          onSelectCategory={handleSelectedCategory}
          group={groupCategories}
          categories={category}
          setCategories={setCategory}
        />
      )}
    </div>
  );
}
