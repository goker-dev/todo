import {Badge} from "../../Badge/Badge";
import styles from './Footer.module.scss'

export const Footer = () =>
    <footer className={styles.footer}>
        <p>
            <a href="https://github.com/gokercebeci/task-list">
                <Badge template='git'>git</Badge>{' '}
                Repo link
            </a>
        </p>
        <p>
            ToDo App - CRA + SCSS
        </p>
        <p>
            &copy; {(new Date().getFullYear())} goker
        </p>
    </footer>