import {ReactNode} from "react";
import styles from './Container.module.scss'

type Props = {
    children: ReactNode
}
export const Container = ({children}: Props) =>
    <div className={styles.container}>
        {children}
    </div>