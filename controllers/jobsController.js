const createJob = async (req, res) => {
  res.send('create Job')
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
