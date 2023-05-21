// eslint-disable-next-line no-unused-vars
import React from 'react'
import styles from './styles.module.scss'
import {MdFastfood} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
 
const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        <form className={styles.inputField}>
          <input type='text' placeholder='eg. Pasta Chicken'/>
          <BsSearch/>
        </form>
        <li className={styles.subtitle}>Find your perfect recipe</li>
        <li className={styles.title}><MdFastfood/> Recipe Finder</li>
      </ul>
    </nav>
  )
}

export default Navbar
