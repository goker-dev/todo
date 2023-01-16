import {ReactNode} from 'react'
import styles from './Form.module.scss'

type Props = {
    className: string
    children?: ReactNode
    htmlFor: string
}

export const Label = ({htmlFor, className, children}: Props) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`${styles.label} ${className}`}>
            {children}
        </label>
    )
}
