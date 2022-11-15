const auth = async (req, res, next) => {
  console.log('authenticate user detected!')
  next()
}

export default auth
