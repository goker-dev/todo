import { InputHTMLAttributes, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from './Label'
import styles from './Form.module.scss'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  name: string
  label?: string
  icon?: ReactNode
  type?: string
}

export const Input = ({
  className,
  name,
  label,
  icon,
  type = 'text',
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() || {}
  const error = errors[name]

  const iconClasses = !!icon && `pr-10`

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="formItem">
        <input
          {...props}
          type={type}
          className={`${styles.input} ${className} ${iconClasses}`}
          {...(name ? register(name) : {})}
        />
        <div className="icon">{icon}</div>
      </div>
      {error && <p className="formItemError">{String(error.message)}</p>}
    </>
  )
}
