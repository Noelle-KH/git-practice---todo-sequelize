const db = require('../models')
const User = db.User

let userController = {
  getUsers: (req, res) => {
    return User.findAll()
      .then((users) => res.json(users))
      .catch(error => console.log(error))
  },
  // Lily02 update
  getUser: (req,res) => {
    res.render('todos')
  }
}
module.exports = userController
