const taskController = require('../controllers/taskController.js')
const userController = require('../controllers/userController.js')
const User = require('../models/user')

module.exports = function (app, passport) {

  app.get('/', (req, res) => res.render('index'))

  app.get('/users', userController.getUsers)
  app.get('/tasks', taskController.getTasks)
  
};