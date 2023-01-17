import { ReactNode } from 'react'
import styles from './Badge.module.scss'

type Props = {
  template: 'urgent' | 'regular' | 'trivial' | 'git'
  children: ReactNode
}
export const Badge = ({ children, template = 'trivial' }: Props) => (
  <i className={styles[template]}>{children}</i>
)
