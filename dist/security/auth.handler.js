"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, '+password') //1st
        .then(user => {
        if (user && user.matches(password)) { //2nd
            //gerar o token
            //3rd
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    }).catch(next);
};
