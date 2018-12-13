const db = require('../models')
const Task = db.Task
const User = db.User

let taskController = {
  getTasks: (req, res) => {
    return User.findByPk(req.user.id, {include: [Task]})
      .then((user) => {
        if (req.params.id) {
          Task.findByPk(req.params.id).then(task => {
            return res.render('tasks', {tasks: user.Tasks, task: task})
          })
        } else { return res.render('tasks', {tasks: user.Tasks, task: false}) }
      })
  },
  postTask: (req, res) => {
    return Task.create({
      name: req.body.name,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: req.user.id
    })
     .then((task) => {
       return res.redirect('/tasks')
     })
  },
  putTask: (req, res) => {
    return Task.findByPk(req.params.id)
      .then((task) => {
        return task.updateAttributes(req.body)
          .then((task) => {
            return res.redirect('/tasks')
          })
      })
  },
  deleteTask: (req, res) => {
    return Task.findByPk(req.params.id)
      .then((task) => {
        return task.destroy()
          .then((task) => {
            return res.redirect('/tasks')
          })
      })
  }
}
module.exports = taskController
