import React from 'react'

import Header from '../../components/Header'
import FeedContainer from '../FeedContainer'
import useHideStories from '../../helpers/hooks/useHideStories'
import useUpvoteStories from '../../helpers/hooks/useUpvoteStories'

function Main () {
  const [hiddenStories, hideStory] = useHideStories()
  const [upvotes, upvoteStory] = useUpvoteStories()
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
