import React from 'react'
import PropTypes from 'prop-types'

import './Feed.css'
import { extractPathname, findAge } from '../../helpers/utils'
import Button from '../Button'

function Feed ({ id, feed, hideStory, hasUserUpvoted, upvoteStory }) {
  return (
    <tr className="feed">
      <th scope="row" className="text-right">
        {feed.num_comments || 0}
      </th>
      <td className="text-right">
        {(feed.points ? parseInt(feed.points) : 0) + (hasUserUpvoted ? 1 : 0)}
      </td>

      <td className="text-small">
        {!hasUserUpvoted && (
          <Button
            onClick={() => {
              upvoteStory(id)
            }}
          >
            ▲
          </Button>
        )}
      </td>
      <td>
        <a href={feed.url} className="feed-title">
          {feed.title}
        </a>
        &nbsp;
        <a href={feed.url} className="greyed">
          {extractPathname(feed.url)}
        </a>
        &nbsp;
        <span className="greyed">by</span>&nbsp;
        <span>{feed.author}</span>&nbsp;
        <span className="greyed">{findAge(feed.created_at)}</span>&nbsp;
        <Button
          onClick={() => {
            hideStory(id)
          }}
        >
          [ hide ]
        </Button>
      </td>
    </tr>
  )
}

Feed.propTypes = {
  id: PropTypes.string.isRequired,
  feed: PropTypes.object.isRequired,
  hideStory: PropTypes.func.isRequired,
  hasUserUpvoted: PropTypes.bool,
  upvoteStory: PropTypes.func.isRequired
}

export default Feed
