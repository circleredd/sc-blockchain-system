const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
        unique: true,
    },
    identity: {
        type: String,
        required: [true, 'Please select an identity.'],
    },
    nonce: {
        type: String,
        default: () => Math.floor(Math.random() * 1000000),
    },
    publicAddress: {
        type: String,
        // required: [true, 'Please provide your publicAddress.'],
    },
    password: {
        type: String,
        required: [true, 'Please provide your password.'],
        minlength: 1,
        select: false, //not to show
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please check your password again.'],
        validate: {
            //This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete passwoedConfirm field, its for only one use
    this.passwordConfirm = undefined;
    next();
});

// userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
//     await bcrypt.compare(candidatePassword, userPassword);

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    //this.passwordChangedAt -> 2023-10-03T16:00:00.000Z
    //JWTTimestamp -> 1696353909
    if (this.passwordChangedAt) {
        const changedAtTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, //millisecond -> second
            10,
        );
        //if password has been changed, and JWTTimestamp < changedAtTimestamp, return true, which means auth is failed
        return JWTTimestamp < changedAtTimestamp;
    }
    //if passwoed has never been changed, return false
    return false;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
