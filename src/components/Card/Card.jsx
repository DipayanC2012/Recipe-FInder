// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { AiOutlineClockCircle, AiFillLike } from 'react-icons/ai'
import { BiDish } from 'react-icons/bi'
import Modal from '../Modal/Modal'

const Card = ({
  key,
  vegetarian,
  popular,
  title,
  readyInMinutes,
  servings,
  likes,
  healthScore,
  image,
  id,
  summary,
  analyzedInstructions
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <>
      <div className={styles.cardWrapper} onClick={() => setIsModalOpen(true)}>
        <img src={image} />
        <div className={styles.detailsContainer}>
          <div className={styles.cta}>
            <div className={styles.title}>{title}</div>
            <div className={`${styles.circle}  ${vegetarian ? styles.veg :styles.nonVeg}`}>
            <div className={styles.outsideRing}>
              <div className={styles.dot} />
            </div>
            </div>
          </div>
          <div className={styles.description}>{summary}</div>
          <div className={styles.specifications}>
            <div className={styles.specificationItem}>
              <AiOutlineClockCircle /> {readyInMinutes} minutes
            </div>
            <div className={styles.specificationItem}>
              <BiDish /> {servings} servings
            </div>
            <div className={styles.specificationItem}>
              <AiFillLike /> {likes}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={title}
          readyInMinutes={readyInMinutes}
          servings={servings}
          likes={likes}
          image={image}
          summary={summary}
          analyzedInstructions={analyzedInstructions}
          setIsModalOpen={setIsModalOpen}
          vegetarian={vegetarian}
        />
      )}
    </>
  )
}

export default Card
