const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");
const { authVerify } = require("../verifyToken");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers": "Content-Type, auth_token, auth_unique_admin_token",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
};

const registerUser = async(req, res) => {
    //verify if the corect method is used
    if (req.method != "POST") {
        res.writeHead(405, headers);
        return res.end(
            JSON.stringify({
                message: "This route can be used only using POST method",
            })
        );
    }
    //import validation method
    const { registerValidation } = require("../dataValidation");

    //get the body data from the request
    let body = "";
    req.on("data", (partData) => {
        body = body + partData;
    });

    //parse the data from the body
    req.on("end", async() => {
        var parsedBody = JSON.parse(body);

        //validation for request data
        registerValidation(parsedBody)
            .then((isValid) => {
                var validInput = isValid;
                if (!isValid)
                    return res.end(JSON.stringify({ message: "Please send valid data" }));

                //validation for unique username
                Admin.findOne({ username: parsedBody.username })
                    .then((admin) => {
                        if (admin) {
                            usernameExists = true;
                            res.writeHead(409, headers);
                            return res.end(
                                JSON.stringify({ message: "This username already exists" })
                            );
                        }
                        addAdminInstanceInDB(parsedBody, res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                res.writeHead(500, headers);
                res.end(
                    JSON.stringify({
                        message: "An error ocured during input Validation , please try again .",
                    })
                );
            });
    });
};

const loginUser = async(req, res) => {
    //verify if the corect method is used
    if (req.method != "POST") {
        res.writeHead(405, headers);
        return res.end(
            JSON.stringify({
                message: "This route can be used only using POST method",
            })
        );
    }
    //import validation method
    const { loginValidation } = require("../dataValidation");

    //get the body data from the request
    let body = "";
    req.on("data", (partData) => {
        body = body + partData;
    });
    //parse the data from the body
    req.on("end", async() => {
        var parsedBody = JSON.parse(body);
        console.log(parsedBody);
        //validation for request data
        loginValidation(parsedBody)
            .then((isValid) => {
                var validInput = isValid;
                if (!isValid) {
                    res.writeHead(500, headers);
                    return res.end(JSON.stringify({ message: "Please send valid data" }));
                }

                //validation for unique username
                Admin.findOne({ username: parsedBody.username })
                    .then(async(admin) => {
                        if (!admin) {
                            // res.statusCode = 406;
                            res.writeHead(406, headers);

                            return res.end(
                                JSON.stringify({
                                    message: "This username doesn't exist , please register",
                                })
                            );
                        }
                        //admin exists , check if password is maching
                        const passwordIsValid = await bcrypt.compare(
                            parsedBody.password,
                            admin.password
                        );
                        if (!passwordIsValid) {
                            // res.statusCode = 400;
                            res.writeHead(400, headers);

                            return res.end(
                                JSON.stringify({ message: "Password is incorect" })
                            );
                        }
                        //Create and asing token
                        const token = jwt.sign({ _id: admin._id },
                            process.env.TOKEN_SECRET
                        );
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({ auth_token: token }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                res.writeHead(500, headers);
                res.end(
                    JSON.stringify({
                        message: "An error ocured during input Validation , please try again .",
                    })
                );
            });
    });
};
const getUniqueChatKey = async(req, res) => {
    //check if URI is corect
    if (req.url.split("/").length != 3) {
        res.writeHead(414, headers);
        res.end(JSON.stringify({ message: "The request url is too long" }));
        return;
    }
    //check if the method is GET
    if (req.method != "GET") {
        res.writeHead(405, headers);
        res.end(
            JSON.stringify({
                message: "This route can be accesed only using GET method",
            })
        );
        return;
    }
    //check if unique auth admin key is corect
    const verified = authVerify(req, res);
    if (verified.succes) {
        Admin.findById(verified.verified._id)
            .then((admin) => {
                res.writeHead(200, headers);
                res.end(JSON.stringify({ token: admin.unique_chat_key }));
            })
            .catch((error) => {
                console.log(error);
                res.writeHead(500, headers);
                res.end(JSON.stringify({ message: "Someting went rong ." }));
            });
    }
};

const addAdminInstanceInDB = async(parsedBody, res) => {
    //hashing the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(parsedBody.password, salt);
    const newAdmin = Admin({
        username: parsedBody.username,
        password: hashedPassword,
    });
    newAdmin
        .save()
        .then((admin) => {
            //create jwt unique token for admin chats
            const jwtUniqueToken = jwt.sign({ _id: admin._id },
                process.env.TOKEN_SECRET_UNIQUE_CHAT
            );
            admin.unique_chat_key = jwtUniqueToken;
            admin.save().catch((error) => console.log(error));
            //send succes response
            res.writeHead(201, headers);
            res.end(JSON.stringify(admin._id));
        })
        .catch((error) => {
            console.log(error);
            res.writeHead(500, headers);
            res.end(
                JSON.stringify({
                    message: "Register failed , try again in a fiew minutes",
                })
            );
        });
};
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.getUniqueChatKey = getUniqueChatKey;