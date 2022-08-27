const { User, Thought } = require("../models");

const userControllers = {
  getAllUsers(req, res) {
    User.find()
      .select("-__v")
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.status(500).json(err));
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((oneUser) => {
        if (!oneUser) {
          return res
            .status(404)
            .json({ message: "No user was found with this ID" });
        }
        res.json(oneUser);
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((deletedUser) => {
        if(!deletedUser) {
          return res.status(404).json({message: "No user was found with this ID."})
        }
        return Thought.deleteMany({ _id: { $in: deletedUser.thoughts }})
      })
      .then(() => {
        res.json({message: "User and thoughts successfully deleted."})
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((newFriend) => res.json(newFriend))
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((removedFriend) => res.json(removedFriend))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userControllers;