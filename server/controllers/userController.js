const { User } = require("../models/user");

const userController = {
  getAll: (req, res) => {
    User.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    User.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.save();

    res.json(user);
  },
};

module.exports = {
  userController,
};
