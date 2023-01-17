import { Badge } from '../../Badge/Badge'
import styles from './Footer.module.scss'

export const Footer = () => (
  <footer className={styles.footer}>
    <p>
      <a
        href="https://github.com/gokercebeci/todo"
        target="_blank"
        rel="noreferrer">
        <Badge template="git">git</Badge> Repo link
      </a>
    </p>
    <p>Todo App - CRA + SCSS</p>
    <p>
      &copy; {new Date().getFullYear()}{' '}
      <a href="https://goker.me" target="_blank" rel="noreferrer">
        goker
      </a>
    </p>
  </footer>
)
