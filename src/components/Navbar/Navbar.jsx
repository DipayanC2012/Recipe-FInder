// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react'
import styles from './styles.module.scss'
import { MdFastfood } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

const Navbar = ({ handleSubmit }) => {
  const inputRef = useRef('')

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(inputRef.current.value)
    handleSubmit(inputRef.current.value)
  }
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        <form className={styles.inputField} onSubmit={submitHandler}>
          <input type='text' placeholder='eg. Pasta Chicken' ref={inputRef} />
          <BsSearch />
        </form>
        <li className={styles.subtitle}>Find your perfect recipe</li>
        <li
          className={styles.title}
          onClick={() => {
            handleSubmit('indian')
          }}
        >
          <MdFastfood /> Recipe Finder
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
