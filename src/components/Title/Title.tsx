import {ReactNode} from "react";
import styles from './Title.module.scss'

type Props = {
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    template?: 'sans' | 'serif'
    children: ReactNode
}
export const Title = ({children, level = 'h2', template = 'sans'}: Props) => {
    const Tag = `${level}` as keyof JSX.IntrinsicElements;
    return <Tag className={`${styles[level]} ${styles[template]}`}>
        {children}
    </Tag>
}