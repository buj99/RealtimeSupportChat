const registerUser = (req, res) => {
  if (req.method != "POST") {
    res.statusCode = 405;
    return res.end(
      JSON.stringify({
        message: "This route can be used only using POST method",
      })
    );
  }
  

};

const loginUser = (req, res) => {};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
