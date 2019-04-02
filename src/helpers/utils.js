export function extractPathname (url) {
  if (!url) return ''
  const matches = url.match(/^https?:\/\/(www.)?([^/?#]+)(?:[/?#]|$)/i)
  return `(${matches[2]})`
}

export function findAge (date) {
  const now = new Date()
  const before = new Date(date)
  const age = now.getTime() - before.getTime()

  const days = Math.floor(age / 86400000)
  const hours = Math.floor(age / 3600000)
  const minutes = Math.floor(age / 60000)

  if (days > 0) return `${days} days ago`
  if (hours > 0) return `${hours} hours ago`
  return `${minutes} minutes ago`
}
