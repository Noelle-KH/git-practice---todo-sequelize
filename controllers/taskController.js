const db = require('../models')
const Task = db.Task
const User = db.User

let taskController = {
  getTasks: (req, res) => {
    return User.findByPk(req.user.id, {include: [Task]})
      .then(function (user) {
        if (req.params.id){
          Task.findByPk(req.params.id).then(task => {
            return res.render('tasks', {tasks: user.Tasks, task: task})
          })
        }
        else 
          return res.render('tasks', {tasks: user.Tasks, task: false})
      });
  },
  postTask: (req, res) => {
    return Task.create({
      name: req.body.name,
      done: false,
      createdAt : new Date(),
      updatedAt : new Date(),
      UserId: req.user.id,
     })
     .then(function (task) {
       res.redirect('/tasks')
     });
  },
  putTask: (req, res) => {
    return Task.findByPk(req.params.id)
      .then(function (task) {
        task.updateAttributes(req.body)
          .then(function(task) {
            res.redirect('/tasks')
          });
      });
  },
  deleteTask: (req, res) => {
    return Task.findByPk(req.params.id)
      .then(function (task) {
        task.destroy()
          .then(function(task) {
            res.redirect('/tasks')
          });
      });
  },
}
module.exports = taskController