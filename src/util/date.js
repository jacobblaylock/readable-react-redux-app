export function prettyDate(timestamp) {
  let dateTime = new Date(timestamp)
  return dateTime.toDateString().substring(4) + ' ' + dateTime.toLocaleTimeString()
}