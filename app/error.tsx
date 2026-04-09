'use client'

import { useEffect } from 'react'
import Button from '@/components/Button/Button'
import css from './error.module.css'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={css.wrapper}>
      <p className={css.code}>Oops!</p>
      <h2 className={css.title}>Something went wrong.</h2>
      <p className={css.message}>Sorry, an unexpected error occurred. Please try again.</p>
      <Button text="Try again" onClick={unstable_retry} />
    </div>
  )
}
