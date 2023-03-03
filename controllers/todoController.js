const db = require('../models')
const Todo = db.Todo
const User = db.User

let todoController = {
  getTodos: (req, res) => {
    return User.findByPk(req.user.id, { include: [Todo] })
      .then((user) => {
        user = user.get({ plain: true })

        if (req.params.id) {
          Todo.findByPk(req.params.id).then(todo => {
            return res.render('todos', { todos: user.Todos, todo: todo })
          })
        } else { return res.render('todos', { todos: user.Todos, todo: false }) }
      })
      .catch(error => console.log(error))
  },
  postTodo: (req, res) => {
    return Todo.create({
      name: req.body.name,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: req.user.id
    })
      .then((todo) => {
        return res.redirect('/todos')
      })
      .catch(error => console.log(error))
  },
  putTodo: (req, res) => {
    return Todo.findByPk(req.params.id)
      .then((todo) => {
        if (req.body.done === 'on') {
          req.body.done = true
        } else {
          req.body.done = false
        }
        return todo.updateAttributes(req.body)
          .then((todo) => {
            return res.redirect('/todos')
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  },
  deleteTodo: (req, res) => {
    return Todo.findByPk(req.params.id)
      .then((todo) => {
        return todo.destroy()
          .then((todo) => {
            return res.redirect('/todos')
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  },
  patchTodoCheck: (req, res) => {
    return Todo.findByPk(req.params.id)
      .then((todo) => {
        return todo.update(req.query)
          .then((todo) => {
            return 200
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
}
module.exports = todoController
