import RegisterForm from './RegisterForm';
import css from './Register.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Step into a world of hassle-free expense management! Your journey towards financial mastery begins here.',
  openGraph: {
    title: 'Sign up',
    description:
      'Step into a world of hassle-free expense management! Your journey towards financial mastery begins here.',
    url: `${process.env.NEXT_PUBLIC_API_URL}/register`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/bg-image-tablet.png`,
        width: 1200,
        height: 630,
        alt: 'Sign up',
      },
    ],
  },
};

export default function RegisterPage() {
  return (
    <div className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <p className={css.formDescr}>
        Step into a world of hassle-free expense management! Your journey
        towards financial mastery begins here.
      </p>

      <RegisterForm />
    </div>
  );
}
