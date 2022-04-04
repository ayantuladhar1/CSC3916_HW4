/*
CSCI3916_HW4
Name: Ayan Tuladhar
File: auth_jwt.js
Description: Web API scaffolding for Authentication API
 */

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./Users');
require("dotenv").config()
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done)
{
    User.findById(jwt_payload.id, function (err, user)
    {
        if (user)
        {
            done(null, user);
        }
        else
        {
            done(null, false);
        }
    });
}));

exports.isAuthenticated = passport.authenticate('jwt', { session : false });
exports.secret = opts.secretOrKey ;