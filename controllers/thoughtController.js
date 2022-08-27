const { json } = require("express");
const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
      Thought.find()
        .select("-__v")
        .then((allThoughts) => res.json(allThoughts))
        .catch((err) => res.status(500).json(err));
    },