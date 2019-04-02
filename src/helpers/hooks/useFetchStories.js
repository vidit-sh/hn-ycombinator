import { useState, useEffect } from 'react'

import { API_URLS } from '../../helpers/constants'

export default function useFetchStories (currentRoute, queryParams) {
  const [feeds, setFeeds] = useState(null)
  const [maxPages, setMaxPages] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setFeeds(null)
    const fetchData = async () => {
      if (currentRoute) {
        try {
          const result = await fetch(
            `${API_URLS[currentRoute]}${
              queryParams.p ? '&page=' + queryParams.p : ''
            }`
          )
          const data = await result.json()

          setFeeds(data.hits)
          setMaxPages(data.nbPages)
        } catch (error) {
          setFeeds([])
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [currentRoute, queryParams])

  return [feeds, maxPages, loading]
}
