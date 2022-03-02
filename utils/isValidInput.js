module.exports = (query) => {
  if (Array.isArray(query)) {
    if (
      query[0].brand.$regex.length <= 6 ||
      query[1].description.$regex.length <= 6
    ) return false
  }
  return true
}
