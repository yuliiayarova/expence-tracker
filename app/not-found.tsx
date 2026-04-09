import Link from 'next/link'
import Button from '@/components/Button/Button'
import css from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <p className={css.code}>404</p>
      <h2 className={css.title}>Page Not Found.</h2>
      <p className={css.message}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/"><Button text="Go Home" /></Link>
    </div>
  )
}
