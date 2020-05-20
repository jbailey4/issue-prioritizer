/**
 * Given a date, for example a date in the past, will return the difference
 * between the current time in text format.
 *
 * Source: https://stackoverflow.com/a/60285897/2299752
 *
 * @param {String} - any valid argument that can be past to the Date constructor
 */
export const getRelativeTime = (date) => {
  const elapsed = new Date(date).getTime() - new Date().getTime()
  const units = [
    ['year', 31536000000],
    ['month', 2628000000],
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000],
    ['second', 1000],
  ]

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  for (const [unit, amount] of units) {
    if (Math.abs(elapsed) > amount || unit === 'second') {
      return rtf.format(Math.round(elapsed / amount), unit)
    }
  }
}

export const getFormattedDate = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(new Date(date))

  return `${month}/${day}/${year}`
}
