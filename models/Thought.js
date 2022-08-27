const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => formatDate(createdAt),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Virtual to track total no. reactions for thought:
thoughtSchema.virtual("reactionCount").get(() => {
    if (!this.reactions) {
        return 0;
    }
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;