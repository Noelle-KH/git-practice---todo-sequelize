const taskController = require('../controllers/taskController.js')
const userController = require('../controllers/userController.js')
const User = require('../models/user')

module.exports = function (app, passport) {

  function authenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }

  app.get('/', authenticated, (req, res) => res.render('index'))

  app.get('/users', (req, res) => userController.getUsers(req, res))

  app.get('/tasks', authenticated, (req, res) => taskController.getTasks(req, res))
  app.get('/tasks/:id', taskController.getTasks)
  app.post('/tasks', taskController.postTask)
  app.put('/tasks/:id', taskController.putTask)
  app.delete('/tasks/:id', taskController.deleteTask)

  app.get('/signin', (req, res) => res.render('signin'))
  app.post('/signin', 
    passport.authenticate('local', { failureRedirect: '/signin',}),
    function(req, res) {
      res.redirect('/')
    }
  )
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/signin')
  })
};