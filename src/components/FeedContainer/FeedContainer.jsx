import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './FeedContainer.css'
import Feed from '../Feed'
import { API_URLS } from '../../helpers/constants'
import { withRoute, Link } from '../../helpers/router'
import Spinner from '../Spinner'

function FeedContainer ({
  currentRoute,
  queryParams,
  hiddenStories,
  hideStory,
  upvotes,
  upvoteStory
}) {
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

  const currentPageNumber = queryParams.p ? parseInt(queryParams.p) : 1

  return (
    <table className="feed-container">
      <tbody>
        {feeds &&
          feeds.map((feed, index) => {
            const key = `${feed.id || feed.story_id}${feed.author}${
              feed.created_at
            }${feed.objectID}`
            return !hiddenStories[key] ? (
              <Feed
                key={key}
                id={key}
                upvoteStory={upvoteStory}
                hasUserUpvoted={upvotes[key]}
                feed={feed}
                hideStory={hideStory}
              />
            ) : null
          })}
        {
          <tr>
            <td />
            <td />
            <td />
            <td className="last-row">
              {loading ? (
                <Spinner />
              ) : feeds && feeds.length ? (
                maxPages > currentPageNumber ? (
                  <Link
                    href={
                      currentRoute +
                      '?p=' +
                      (queryParams.p ? parseInt(queryParams.p) + 1 : 2)
                    }
                  >
                    More
                  </Link>
                ) : null
              ) : (
                <p>No records found.</p>
              )}
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

FeedContainer.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  queryParams: PropTypes.object.isRequired,
  hiddenStories: PropTypes.object.isRequired,
  hideStory: PropTypes.func.isRequired,
  upvotes: PropTypes.object.isRequired,
  upvoteStory: PropTypes.func.isRequired
}

export default withRoute(FeedContainer)
