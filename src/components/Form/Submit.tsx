import type { Props } from './Button'
import { Button } from './Button'
import styles from './Form.module.scss'

export const Submit = ({
  children,
  className = '',
  template = 'submit',
  ...props
}: Props) => (
  <Button
    {...props}
    className={`${styles.submit} ${className}`}
    template={template}
    type="submit">
    {children}
  </Button>
)
