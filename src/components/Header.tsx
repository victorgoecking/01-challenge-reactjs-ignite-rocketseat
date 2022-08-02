import styles from './Header.module.css';
import LogoToDo from '../assets/logo-to-do.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={LogoToDo} alt="Logotipo do ToDo"/>
    </header>
  )
}