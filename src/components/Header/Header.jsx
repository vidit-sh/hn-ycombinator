import React from 'react'

import './Header.css'
import { ROUTES } from '../../helpers/constants'
import { Link, withRoute } from '../../helpers/router'

function Header ({ currentRoute }) {
  return (
    <header>
      <a href="/" className="logo">
        <img alt="YCombinator" src="./assets/images/logo.gif" />
      </a>
      <nav>
        <Link
          href={ROUTES.DEFAULT}
          className={currentRoute === ROUTES.DEFAULT ? 'selected' : ''}
        >
          top
        </Link>
        |
        <Link
          href={ROUTES.NEWEST}
          className={currentRoute === ROUTES.NEWEST ? 'selected' : ''}
        >
          new
        </Link>
      </nav>
    </header>
  )
}

export default withRoute(Header)
