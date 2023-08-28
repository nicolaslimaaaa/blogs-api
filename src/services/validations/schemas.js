const Joi = require('joi');

// const regexEmail = /^\w+@\w+?\.[a-zA-Z]{2,3}$/;

const userSchema = Joi.object({
    displayName: Joi.string().min(8).required().label('displayName'),
    email: Joi.string().email().required().label('email'),
    password: Joi.string().min(6).required().label('password'),
    image: Joi.string().label('image'),
}).messages({
    'displayName.min': '{{#label}} length must be at least 8 characters long',
    'password.min': '{{#label}} length must be at least 6 characters long',
    'email.email': '{{#label}}  must be a valid email',
    'any.required': '{{#label}} is required',
});

module.exports = {
    userSchema,
};