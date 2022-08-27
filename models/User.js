const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema(