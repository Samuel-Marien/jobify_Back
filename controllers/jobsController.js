import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const createJob = async (req, res) => {
  const { position, company } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
  res.send('deleteJob Job')
}
const getAllJobs = async (req, res) => {
  res.send('getAllJobs Job')
}
const updateJob = async (req, res) => {
  res.send('updateJob Job')
}
const showStats = async (req, res) => {
  res.send('showStats Job')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
