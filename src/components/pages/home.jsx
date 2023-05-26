// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import Card from '../Card/Card'
import styles from './styles.module.scss'
import Loading from '../Loading/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const API_KEY = 'bd81d2f1db454c8c8e92314ad3e9c317'
const maxResults = 50

const HomePage = () => {
  const [data, setData] = useState()
  const [query, setQuery] = useState('indian')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [shownData, setShownData] = useState()
  const [splice, setSplice] = React.useState({
    start: 0,
    end: 10
  })
  const [totalResults, setTotalResults] = useState()

  React.useEffect(() => {
    setLoading(true)
    setError('')
    setSplice({
      start: 0,
      end: 10
    })
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=${maxResults}&apiKey=${API_KEY}`
      )
      .then((res) => {
        setData(res.data.results)

        if (res.data.results.length === 0) {
          setError('No results found')
        } else {
          setShownData(res.data.results.slice(splice.start, splice.end))
          setTotalResults(res.data.totalResults)
        }
        setLoading(false)
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message)
        } else {
          setError(err.message)
        }
        setLoading(false)
      })
  }, [query])

  const fetchData = () => {
    const random = Math.floor(Math.random() * 500) + 500
    setTimeout(() => {
      setShownData((prev) => {
        return [...prev, ...data.slice(splice.start + 10, splice.end + 10)]
      })
      setSplice((prev) => {
        return {
          start: prev.start + 10,
          end: prev.end + 10
        }
      })
    }, random)
  }
  const handleSubmit = React.useCallback(
    (query) => {
      const trimmedQuery = query.trim()
      if (trimmedQuery === '') {
        setError('Please enter a valid search query')
        return
      }
      setQuery(trimmedQuery)
    },
    [query]
  )

  // console.log(data)
  return (
    <>
      <Navbar handleSubmit={handleSubmit} />
      {loading ? (
        <div className={styles.initialLoading}>
          <Loading type='bars' color='#1CAC78' />
        </div>
      ) : (
        <>
          {error && <h1 className={styles.errorMessage}>{error}</h1>}
          {error === '' && (
            <InfiniteScroll
              dataLength={shownData.length} //This is important field to render the next data
              next={fetchData}
              hasMore={shownData.length < totalResults && data.length !== 0}
              loader={
                <div className={styles.laterLoading}>
                  <Loading type='balls' color='#1cac78' />
                </div>
              }
            >
              <div className={styles.cardsSection}>
                {error === '' &&
                  shownData.map((item) => {
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
              </div>
            </InfiniteScroll>
          )}
        </>
      )}
    </>
  )
}

export default HomePage
