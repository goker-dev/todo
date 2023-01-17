import { ButtonHTMLAttributes, Ref } from 'react'
import styles from './Form.module.scss'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  template?: '' | 'submit' | 'save' | 'confirm' | 'cancel' | 'icon'
  reference?: Ref<HTMLButtonElement> | null
}

export const Button = ({
  className = '',
  template = '',
  children,
  type = 'button',
  reference = null,
  ...props
}: Props) => (
  <button
    data-cy="Button"
    ref={reference}
    {...props}
    type={type}
    className={`${styles.button} ${styles['button-' + template]} ${className}`}>
    {children}
  </button>
)
