const router = require("express").Router();
const { getAllUsers, createUser, getOneUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/userController");