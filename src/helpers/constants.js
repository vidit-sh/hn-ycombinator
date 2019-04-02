export const ROUTES = {
  DEFAULT: '/',
  NEWEST: '/newest'
}

export const API_URLS = {
  [ROUTES.DEFAULT]:
    'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30',
  [ROUTES.NEWEST]: 'https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=30'
}
