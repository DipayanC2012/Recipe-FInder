// eslint-disable-next-line no-unused-vars
import React from 'react'
import styles from './styles.module.scss'
import {
  AiOutlineClockCircle,
  AiFillLike,
  AiOutlineCloseCircle
} from 'react-icons/ai'
import { BiDish } from 'react-icons/bi'
import { createPortal } from 'react-dom'

const Modal = ({
  vegetarian,
  title,
  readyInMinutes,
  servings,
  likes,
  image,
  summary,
  analyzedInstructions,
  setIsModalOpen,
}) => {
  React.useEffect(() => {
    function handleEscapeKey(e) {
      if (e.keyCode === 27) {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  summary = summary.replace(/(<([^>]+)>)/gi, '')

  const stepsArray = analyzedInstructions.map((step) => {
    return step.steps
  })
  // console.log(vegetarian)

  return createPortal(
    <>
      <div className={styles.modalBackdrop}></div>
      <div className={styles.modalWrapper}>
        <div className={styles.cta}>
          <div className={styles.specificationItem}>
            <AiOutlineClockCircle /> {readyInMinutes} minutes
          </div>
          <div className={styles.specificationItem}>
            <BiDish /> {servings} servings
          </div>
          <div className={styles.specificationItem}>
            <AiFillLike /> {likes}
          </div>
          <div
            className={`${styles.specificationItem} ${styles.closeButton}`}
            onClick={() => setIsModalOpen(false)}
          >
            <AiOutlineCloseCircle />
          </div>
        </div>

        <div className={styles.detailsWrapper}>
          <img src={image} />
          <div className={styles.detailsContainer}>
            <div className={styles.titleContainer}>
            <div className={styles.title}>{title}</div>
            <div className={`${styles.circle}  ${vegetarian ? styles.veg :styles.nonVeg}`}>
            <div className={styles.outsideRing}>
              <div className={styles.dot} />
            </div>
            </div>
            </div>
            
            <div className={styles.description}>
              <p>Summary</p>
              <br/>
              {summary}</div>
          </div>
        </div>

        <div className={styles.stepsSection}>
          <p>Steps</p>
          <ol>
            {stepsArray.length > 0 ? (
              stepsArray[0].map((step, index) => {
                return <li key={index}>{step.step}</li>
              })
            ) : (
              <li>This recipe has no steps.</li>
            )}
          </ol>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  )
}

export default Modal
