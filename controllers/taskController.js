const db = require('../models')
const Task = db.Task

let taskController = {
  getTasks: (req, res) => {
    return Task.findAll().then((tasks) => res.json(tasks))
  },
}
module.exports = taskController