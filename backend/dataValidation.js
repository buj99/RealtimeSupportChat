const { Validator } = require("node-input-validator");
const registerValidation = async(data) => {
    const v = new Validator(data, {
        username: "required|minLength:4|maxLength:255|string",
        password: "required|minLength:4|maxLength:255|string|same:confirmPassword"
    });
    return await v.check();
};
const loginValidation = async(data) => {
    const v = new Validator(data, {
        username: "required|minLength:4|maxLength:255|string",
        password: "required|minLength:4|maxLength:255|string",
    });
    return await v.check();
};
const messageValidation = async(data) => {
    const v = new Validator(data, {
        message: "required|maxLength:255|string",
    });
    return await v.check();
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.messageValidation = messageValidation;