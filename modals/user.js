"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// Promise.promisifyAll(mongoose);
var user = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        default: "12345"
    },
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    address:{
        type:String,
        default:null
    },
    specilization:{
        type:String,
        default:null
    }
}, {
    versionKey: false
});

// Saves the user's password hashed (plain text password storage is not good)
user.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


// Create method to compare password input to password saved in database
user.methods.comparePassword = function (pw, cb) {

    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}


var adminU = mongoose.model('users', user);
module.exports = adminU;