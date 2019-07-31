const UserDAO = require('../DAO/userDAO');
const MD5 = require('md5');
const user = require('../models/user');

/* API to register new user */
let register = async (req, res) => {
  console.log('REGISTER a new user!');
  if (
    req.body.firstName == null ||
    req.body.firstName == '' ||
    req.body.lastName == null ||
    req.body.lastName == '' ||
    req.body.department == null ||
    req.body.department == '' ||
    req.body.username == null ||
    req.body.username == '' ||
    req.body.password == null ||
    req.body.password == '' ||
    req.body.email == null ||
    req.body.email == ''
  ) {
    console.log('Param missing');
    res.json({
      success: false,
      message: 'Ensure user, email, pw were provided'
    });
  } else {
    try {
      let criteria = {
        email: req.body.email
      };
      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length > 0) {
        console.log('Email already registered');
        res.status(401).json({ message: 'email already registered' });
      } else {
        let criteria = {
          username: req.body.username
        };
        const checkUser = await UserDAO.getUsers(criteria);
        if (checkUser && checkUser.length > 0) {
          console.log('Username already registered');
          res.status(401).json({ message: 'username already registered' });
        } else {
          let userData = {
            firstName: req.body.firstName ? req.body.firstName : '',
            lastName: req.body.lastName ? req.body.lastName : '',
            email: req.body.email,
            department: req.body.department,
            username: req.body.username,
            password: MD5(MD5(req.body.password)),
            status: true
          };
          const addUser = await UserDAO.createUser(userData);
          // console
          if (addUser) {
            console.log('User registered successfully!');
            res.status(200).json({ message: 'User registered successfully!' });
          } else {
            console.log('Something went wrong');
            res.status(403).json({ message: 'Something went wrong' });
          }
        }
      }
    } catch (error) {
      console.log('Something went wrong');
      res.status(404).json({ message: 'Something went wrong', error: error });
    }
  }
};

// FIX: use bcrypt

/* API to login user */
let login = async (req, res) => {
  console.log('Login!');
  if (!req.body.username || !req.body.password) {
    console.log('params missing');
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      let criteria = {
        username: req.body.username
      };
      const checkUser = await UserDAO.getUsers(criteria);
      if (checkUser.length > 0) {
        let criteria = {
          username: req.body.username,
          password: MD5(MD5(req.body.password))
        };
        const checkPassword = await UserDAO.getUsers(criteria);
        if (checkPassword.length == 1) {
          console.log('Logged in successfully!');
          res.status(200).json({
            message: 'Logged in successfully!',
            result: checkPassword[0],
            token: 'dummy-jwt-token-for-now'
          });
        } else {
          console.log('password incorrect');
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        console.log('username DNE');
        res.status(401).json({ message: 'Username does not exist!' });
      }
    } catch (error) {
      console.log('something went wrong');
      res.status(401).json({ message: 'Something went wrong', error: error });
    }
  }
};

module.exports = {
  register: register,
  login: login
};
