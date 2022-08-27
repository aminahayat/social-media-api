const router = require("express").Router();
const { getAllThoughts, getOneThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require("../../controllers/thoughtController")
