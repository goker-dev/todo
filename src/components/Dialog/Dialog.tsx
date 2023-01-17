import styles from './Dialog.module.scss'
import { createPortal } from 'react-dom'
import { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}
export const Dialog = ({ children, className = '', ...props }: Props) => {
  return createPortal(
    <div
      data-testid="dialog"
      className={styles.Dialog}
      role="dialog"
      aria-modal="true"
      {...props}>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.container} ${className}`}>
        <div className="flex-grow relative flex-1">{children}</div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  )
}
