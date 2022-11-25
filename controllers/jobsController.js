import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFounderror } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

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
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFounderror(`No job with id: ${jobId}`)
  }

  //check permissions
  checkPermissions(req.user, job.createdBy)

  await job.remove()
  res.status(StatusCodes.OK).json({ msg: 'Successfully remove job!' })
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { company, position } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFounderror(`No job with id: ${jobId}`)
  }

  //check permissions
  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true
  })
  res.status(200).json({ updatedJob })
}

const showStats = async (req, res) => {
  res.send('showStats Job')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
