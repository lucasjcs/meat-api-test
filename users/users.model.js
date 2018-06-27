"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var validators_1 = require("../common/validators");
var bcrypt = require("bcrypt");
var environment_1 = require("../common/environment");
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        "enum": ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    }
});
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email: email }, projection); //{email: email}
};
userSchema.methods.matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
var hashPassword = function (obj, next) {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(function (hash) {
        obj.password = hash;
        next();
    })["catch"](next);
};
var saveMiddleware = function (next) {
    var user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
var updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
