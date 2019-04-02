import { useState, useEffect } from 'react'

export default function useHideStories () {
  const [hiddenStories, setHiddenStories] = useState({})
  useEffect(() => {
    const localHiddenStoriesValue = window.localStorage.getItem('hiddenStories')
    setHiddenStories(
      localHiddenStoriesValue ? JSON.parse(localHiddenStoriesValue) : {}
    )
  }, [])
  const hideStory = story => {
    setHiddenStories({ ...hiddenStories, [story]: true })
    window.localStorage.setItem(
      'hiddenStories',
      JSON.stringify({ ...hiddenStories, [story]: true })
    )
  }
  return [hiddenStories, hideStory]
}
