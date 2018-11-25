const db = require('../models')
const Task = db.Task

let taskController = {
  getTasks: (req, res) => {
    Task.findAll().then((tasks) => {
      if (req.params.id){
        Task.findByPk(req.params.id).then(task => {
          return res.render('tasks', {tasks: tasks, task: task})
        })
      } else {
        return res.render('tasks', {tasks: tasks, task: false})
      }
    })
  },
  postTask: (req, res) => {
    return Task.create({
      name: req.body.name, 
      createdAt : new Date(),
      updatedAt : new Date(),
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