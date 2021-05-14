const jwt = require("jsonwebtoken");
//admin token verify
function authVerify(req, res) {
  const token = req.headers.auth_token;
  if (!token) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Acces denied " }));
    return { succes: false, verified: null };
  }
  let verified;
  try {
    verified = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid token" }));
    return { succes: false, verified: null };
  }
  return { succes: true, verified: verified };
}
//admin token verify for message
function adminAuthVerify(req, res) {
  const token = req.headers.auth_token;
  if (!token) {
    return false;
  }
  let verified;
  try {
    verified = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

//chat unique admin token verify
function authChatAdminTokenVerify(req, res) {
  const token = req.headers.auth_unique_admin_token;
  if (!token) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Acces denied " }));
    return { succes: false, verified: null };
  }
  let verified;
  try {
    verified = jwt.verify(token, process.env.TOKEN_SECRET_UNIQUE_CHAT);
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid token" }));
    return { succes: false, verified: null };
  }
  return { succes: true, verified: verified };
}

//chat message submit token
function authChatToken(req, res) {
  const token = req.headers.auth_chat;
  if (!token) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Acces denied " }));
    return { succes: false, verified: null };
  }
  let verified;
  try {
    verified = jwt.verify(token, process.env.TOKEN_SECRET_CHAT_IDENTIFIER);
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid token" }));
    return { succes: false, verified: null };
  }
  return { succes: true, verified: verified };
}

module.exports.adminAuthVerify = adminAuthVerify;
module.exports.authVerify = authVerify;
module.exports.authChatAdminTokenVerify = authChatAdminTokenVerify;
module.exports.authChatToken = authChatToken;
