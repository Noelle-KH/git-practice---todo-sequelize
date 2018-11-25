const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const db = require('./models')
const User = db.User
const Task = db.Task

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)
