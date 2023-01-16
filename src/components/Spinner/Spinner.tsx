import {ReactElement} from 'react'

type Props = {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'xl' | '2xl' | '3xl' | '4xl'
}

export const Spinner = ({className = '', size = 'sm'}: Props): ReactElement => (
  <i
    className={`icon-spinner-2 block animate-spin text-${size} ${className}`}
  />
)
