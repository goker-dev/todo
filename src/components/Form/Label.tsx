import { LabelHTMLAttributes, ReactNode } from 'react'
import styles from './Form.module.scss'

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string
  children: ReactNode
  className?: string
}

export const Label = ({
  htmlFor,
  children,
  className = '',
  ...props
}: Props) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`${styles.label} ${className}`}>
      {children}
    </label>
  )
}
