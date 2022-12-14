import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // console.log(`Auth headers : ${authHeader}`)
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Invalid authentication!')
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload)
    req.user = { userId: payload.userId }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Invalid authentication!')
  }
}

export default auth
