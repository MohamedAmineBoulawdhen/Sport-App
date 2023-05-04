export default (dateToFormat: string): string => {
  const dateObj = new Date(dateToFormat)
  const formattedDate = dateObj.toISOString().substr(0, 10)
  return formattedDate
}
