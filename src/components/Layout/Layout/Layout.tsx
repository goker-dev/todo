import { ReactNode } from 'react'
import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props) => (
  <div className={styles.Layout}>{children}</div>
)
