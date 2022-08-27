const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            validate: [isEmail, "Invalid email format"], // TEST.            
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users",
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);