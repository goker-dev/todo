import {Button} from './Button'
import type {Props} from './Button'
import styles from './Form.module.scss'

export const Submit = ({className, template="submit", ...props}: Props) => (
  <Button {...props} className={`${styles.submit} ${className}`} template={template} type="submit">
    {props.children}
  </Button>
)
