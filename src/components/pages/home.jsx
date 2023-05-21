// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import Card from '../Card/Card'
import styles from './styles.module.scss'

const API_KEY = '886f90516ab4499d90de942cb36f99fd'
const maxResults = 50

const HomePage = () => {
  const [data, setData] = useState()
  const [query, setQuery] = useState('indian')
  const [error, setError] = useState()

  React.useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=${maxResults}&apiKey=${API_KEY}`
      )
      .then((res) => {
        setData(res.data.results)
        if (res.data.results.length === 0) {
          setError('No results found')
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message)
        } else {
          setError(err.message)
        }
      })
  }, [query])

  // console.log(data)
  return (
    <>
      <Navbar />
      <div className={styles.cardsSection}>
        {data &&
          data.map((item) => {
            return (
              <Card
                key={item.id}
                vegetarian={item.vegetarian}
                popular={item.veryPopular}
                title={item.title}
                readyInMinutes={item.readyInMinutes}
                servings={item.servings}
                likes={item.aggregateLikes}
                healthScore={item.healthScore}
                image={item.image}
                id={item.id}
                summary={item.summary}
                analyzedInstructions={item.analyzedInstructions}
              />
            )
          })}
        <Card />
      </div>
    </>
  )
}

export default HomePage
