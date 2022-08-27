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

// Virtual to track total friend count for the user:
userSchema.virtual("friendCount").get(() => {
    if (this.friends) {
    return this.friends.length;
    } else if (!this.friends) {
    return 0;
    }
});

const User = model('user', userSchema);

module.exports = User;