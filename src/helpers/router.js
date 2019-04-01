import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const RouterContext = React.createContext()

export function Router ({ children }) {
  const [currentRoute, setCurrentRoute] = useState(null)
  const [routeParams, setRouteParams] = useState({})
  const [queryParams, setQueryParams] = useState({})

  const isSameOrigin = url => {
    return !url.match(/^https?:\/\//) || url.startsWith(window.location.origin)
  }

  const parseQueryParams = url => {
    if (!url) return {}
    const strippedUrl = url.substring(1)
    return strippedUrl
      .split('&')
      .map(keyValue => {
        return keyValue.split('=')
      })
      .reduce((accu, curr) => ({ ...accu, [curr[0]]: curr[1] }), {})
  }

  const onRouteChange = event => {
    event.persist()
    if (event.defaultPrevented) return
    if (
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      isSameOrigin(event.target.href)
    ) {
      event.preventDefault()
      window.history.pushState(
        null,
        document.title,
        event.target.pathname + event.target.search
      )

      setCurrentRoute(event.target.pathname)
      setQueryParams(
        currentRoute === event.target.pathname
          ? parseQueryParams(event.target.search)
          : {}
      )
    }
  }

  useEffect(() => {
    setCurrentRoute(window.location.pathname)
    setRouteParams(parseQueryParams(window.location.search))

    window.onpopstate = () => {
      setCurrentRoute(window.location.pathname)
      setQueryParams(parseQueryParams(window.location.search))
    }
  }, [])

  return (
    <RouterContext.Provider
      value={{
        currentRoute,
        routeParams,
        queryParams,
        onRouteChange
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

Router.propTypes = {
  children: PropTypes.node.isRequired
}

export function Link ({ href, onClick, children, ...otherProps }) {
  return (
    <RouterContext.Consumer>
      {({ onRouteChange }) => (
        <a
          href={href}
          onClick={event => {
            if (onClick) onClick(event)
            onRouteChange(event)
          }}
          {...otherProps}
        >
          {children}
        </a>
      )}
    </RouterContext.Consumer>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export function withRoute (Component) {
  return function WithRouteComponent (props) {
    return (
      <RouterContext.Consumer>
        {contextVariables => <Component {...props} {...contextVariables} />}
      </RouterContext.Consumer>
    )
  }
}
