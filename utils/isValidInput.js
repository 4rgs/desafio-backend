module.exports = (body) => {
  return ((body.description !== undefined && body.description.length >= 3) || 
          (body.brand !== undefined && body.brand.length >= 3) || 
          body.id !== undefined )
}
