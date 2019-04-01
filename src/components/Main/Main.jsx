import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import FeedContainer from '../FeedContainer'

function Main () {
  const [hiddenStories, setHiddenStories] = useState({})
  const [upvotes, setUpvotes] = useState({})

  useEffect(() => {
    const localHiddenStoriesValue = window.localStorage.getItem('hiddenStories')
    setHiddenStories(
      localHiddenStoriesValue ? JSON.parse(localHiddenStoriesValue) : {}
    )

    const localUpvotesValue = window.localStorage.getItem('upvotes')
    setUpvotes(localUpvotesValue ? JSON.parse(localUpvotesValue) : {})
  }, [])

  const hideStory = story => {
    setHiddenStories({ ...hiddenStories, [story]: true })
    window.localStorage.setItem(
      'hiddenStories',
      JSON.stringify({ ...hiddenStories, [story]: true })
    )
  }

  const upvoteStory = story => {
    setUpvotes({ ...upvotes, [story]: true })
    window.localStorage.setItem(
      'upvotes',
      JSON.stringify({ ...upvotes, [story]: true })
    )
  }

  return (
    <>
      <Header />
      <main className="container">
        <FeedContainer
          hiddenStories={hiddenStories}
          hideStory={hideStory}
          upvotes={upvotes}
          upvoteStory={upvoteStory}
        />
      </main>
    </>
  )
}

export default Main
