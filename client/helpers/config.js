export const prefixUrl = (url) => {
  const prefix = process.env.NODE_ENV === 'development' ? '' : 'static/'
  return prefix + url
}