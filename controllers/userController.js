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
  },
  // Lily04 update
  getTopUsers: (req, res) => {
    // Lily04 update-2
    const controller = req.userController
    const data = req.User

    return User.findAll()
      .then((users) => res.json(users))
      .catch(error => console.log(error))
  }
}

module.exports = userController
