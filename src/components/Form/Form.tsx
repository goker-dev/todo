import { HTMLProps, useRef, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnyObjectSchema } from 'yup'
import * as Yup from 'yup'
import styles from './Form.module.scss'

type Props = HTMLProps<HTMLFormElement> & {
  schema?: AnyObjectSchema
  onSubmit?: SubmitHandler<{ [x: string]: any }>
  onChange?: SubmitHandler<{ [x: string]: any }>
  defaultValues?: any
  resetOnSubmit?: boolean
}

export const Form = ({
  className = '',
  defaultValues = {},
  children,
  schema = Yup.object().shape({}),
  onSubmit = () => null,
  onChange,
}: Props) => {
  const ref = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState('')

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
    reValidateMode: 'onChange',
  })

  const handleSubmit = async (data: any) => {
    setLoading('loading')
    await onSubmit(data)
    methods.reset(defaultValues)
    setLoading('')
  }

  const handleFormChange = () => {
    const watch = { ...methods.watch() }
    if (onChange) onChange(watch)
  }

  return (
    <FormProvider
      {...methods}
      // @ts-ignore
      defaultValues={defaultValues}
      handleFormChange={handleFormChange}>
      <form
        ref={ref}
        className={`${styles.form} ${styles[loading]} ${className}`}
        onSubmit={methods.handleSubmit(handleSubmit)}
        onChange={handleFormChange}>
        {children}
      </form>
    </FormProvider>
  )
}
