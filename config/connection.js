const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialMediaAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
});

module.exports = mongoose.connection;