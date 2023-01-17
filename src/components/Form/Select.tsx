import React, { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { Label } from './Label'
import styles from './Form.module.scss'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  options: { label: string; value: string }[]
  label?: string
  className?: string
}

export const Select = ({
  name,
  options,
  label,
  className = '',
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() || {}
  const error = errors[name]

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        {...props}
        className={`${styles.select} ${className}`}
        {...(name ? register(name) : {})}>
        {options.map((i, k) => (
          <option key={k} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
      {error && <p className="formItemError">{String(error.message)}</p>}
    </>
  )
}
