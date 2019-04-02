import { useState, useEffect } from 'react'

export default function useUpvoteStories () {
  const [upvotes, setUpvotes] = useState({})

  useEffect(() => {
    const localUpvotesValue = window.localStorage.getItem('upvotes')
    setUpvotes(localUpvotesValue ? JSON.parse(localUpvotesValue) : {})
  }, [])

  const upvoteStory = story => {
    setUpvotes({ ...upvotes, [story]: true })
    window.localStorage.setItem(
      'upvotes',
      JSON.stringify({ ...upvotes, [story]: true })
    )
  }

  return [upvotes, upvoteStory]
}
