import Logo from 'assets/logo.png'
import styles from './Header.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <img className={styles.logo} src={Logo} alt="ToDo app Logo" />
  </header>
)
