import LoginForm from './LoginForm';
import css from './Login.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  description:
    'Welcome back to effortless expense tracking! Your financial dashboard awaits.',
  openGraph: {
    title: 'Sign in',
    description:
      'Welcome back to effortless expense tracking! Your financial dashboard awaits.',
    url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/bg-image-tablet.png`,
        width: 1200,
        height: 630,
        alt: 'Sign in',
      },
    ],
  },
};

export default function LoginPage() {
  return (
    <div className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <p className={css.formDescr}>
        Welcome back to effortless expense tracking! Your financial dashboard
        awaits.
      </p>
      <LoginForm />
    </div>
  );
}
