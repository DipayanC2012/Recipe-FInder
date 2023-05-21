// eslint-disable-next-line no-unused-vars
import React from 'react'
import styles from './styles.modal.scss'
import {
  AiOutlineClockCircle,
  AiFillLike,
  AiOutlineCloseCircle
} from 'react-icons/ai'
import { BiDish } from 'react-icons/bi'

const Modal = ({
  title,
  readyInMinutes,
  servings,
  likes,

  image,

  summary,
  analyzedInstructions,
  setIsModalOpen
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

  return (
    (
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
            >
              <AiOutlineCloseCircle />
            </div>
          </div>

          <div className={styles.detailsWrapper}>
            <img src={image} />
            <div className={styles.detailsContainer}>
              <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.description}>{summary}</div>
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
      </>
    ),
    document.getElementById('modal')
  )
}

export default Modal
