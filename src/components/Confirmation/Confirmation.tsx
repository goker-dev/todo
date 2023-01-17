import { ReactNode, useEffect, useRef } from 'react'
import { Dialog } from '../Dialog/Dialog'
import { Title } from '../Title/Title'
import { Button } from '../Form'
import styles from './Confirmation.module.scss'

type Props = {
  onConfirm: () => void
  onCancel: () => void
  cancelText?: ReactNode
  confirmText?: ReactNode
  title?: ReactNode
  icon?: ReactNode
}
export const Confirmation = ({
  onConfirm,
  onCancel,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  title = 'Are you sure you want to do this?',
  icon = <i className="icon-warning-empty" />,
}: Props) => {
  const ref = useRef<HTMLButtonElement>(null)
  const onKeyUp = (e: KeyboardEvent) => e.code === 'Escape' && onCancel()

  useEffect(() => {
    ref?.current?.focus()
    document.addEventListener('keydown', onKeyUp)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Dialog className={styles.dialog} data-testid="confirmation">
      <div className={styles.Confirmation}>
        {icon}
        <Title>{title}</Title>
        <div className={styles.actions}>
          <Button onClick={onCancel} data-testid="confirmation.cancel">
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            template="confirm"
            reference={ref}
            data-testid="confirmation.confirm">
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
