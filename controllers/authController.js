import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

const register = async (req, res, next) => {
  // Ce try catch ou alors le package "express async error"
  // try {
  //   const user = await User.create(req.body)
  //   res.status(201).json({ user })
  // } catch (error) {
  //   next(error)
  // }
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ user })
}
const login = async (req, res) => {
  res.send('login user')
}
const updateUser = async (req, res) => {
  res.send('updateUser user')
}

export { register, login, updateUser }
