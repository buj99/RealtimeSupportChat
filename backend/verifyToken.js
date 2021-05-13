const jwt = require("jsonwebtoken");

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

module.exports.authVerify = authVerify;
