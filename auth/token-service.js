const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = { // what the token is describing
    subject: user.id,
    username: user.username,
    roles: ["user"]// user role
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}