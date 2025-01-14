const axios = require('axios');
const bcrypt = require("bcryptjs");
const tokenService = require("../auth/tokenGenerator.js");

const Users = require("./routes-model.js");

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/logout', logout);

 
};

function logout (req, res) {
  if (req.token) {
    req.token.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ther was an error loging out'});
    }
    res.end();
  });
} else {
  res.end();
}
}


function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const token = tokenService.generateToken(user);
      res.status(201).json({ saved, message: `registered, ${token}` });
    })
    .catch(error => {
      res.status(500).json({error, message: 'Error registering user'});
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          roles: token.roles // for user roles
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({error, message: '500 failure on logging in'}); // was just (error)
    });
}





function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
