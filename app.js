const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const User = db.User
const Task = db.Task

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) =>
  User.findAll().then((users) => res.json(users))
)

app.get('/tasks', (req, res) =>
  Task.findAll().then((tasks) => res.json(tasks))
)

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})
