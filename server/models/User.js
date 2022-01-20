const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

// import schema from Show.js
const showSchema = require('./Show');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },

        savedShows: [showSchema],
    },

    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcryptjs.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcryptjs.compare(password, this.password);
};

// when we query a user, we'll also get another field called `showCount` with the number of saved shows we have
userSchema.virtual('showCount').get(function () {
    return this.savedShows.length;
});

const User = model('User', userSchema);

module.exports = User;