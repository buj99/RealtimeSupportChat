const { authVerify } = require("../verifyToken");
const posts = async (req, res) => {
  const verified = authVerify(req, res);
  if (verified.succes) {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "this is a post" }));
  }
};

module.exports.posts = posts;
