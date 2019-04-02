import React from 'react'
import PropTypes from 'prop-types'

import './FeedContainer.css'
import Feed from '../Feed'
import { withRoute, Link } from '../../helpers/router'
import Spinner from '../Spinner'
import useFetchStories from '../../helpers/hooks/useFetchStories'

function FeedContainer ({
  currentRoute,
  queryParams,
  hiddenStories,
  hideStory,
  upvotes,
  upvoteStory
}) {
  const [feeds, maxPages, loading] = useFetchStories(currentRoute, queryParams)

  const currentPageNumber = queryParams.p ? parseInt(queryParams.p) : 1

  return (
    <table className="feed-container">
      <tbody>
        {feeds &&
          feeds.map(feed => {
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
  currentRoute: PropTypes.string,
  queryParams: PropTypes.object.isRequired,
  hiddenStories: PropTypes.object.isRequired,
  hideStory: PropTypes.func.isRequired,
  upvotes: PropTypes.object.isRequired,
  upvoteStory: PropTypes.func.isRequired
}

export default withRoute(FeedContainer)
