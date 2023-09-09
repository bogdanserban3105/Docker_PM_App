const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const userController = {

  // getAll: async function (req, res) {
  //   let users;
  //   if (req.query.name) {
  //     users = await userModel.getUserByName(req.query.name);
  //   } else {
  //     users = await userModel.getAllUsers();
  //     console.log(users);
  //   }
  //   res.status(200).json(users);
  // },
  getAll: async function (req, res) {
    let userss = await userModel.getAllUsers();

    res.status(200).json(userss);
  },
  getById: async function (req, res) {
    let user = await userModel.getUserById(req.params.id);

    res.status(200).json(user); 
  },

  getByName: async function (req, res) {
    let user = await userModel.getUserByName(req.params.name);

    res.status(200).json(user);
  },
  getByEmail: async function (req, res) {
    let user = await userModel.getUserByEmail(req.params.email);

    res.status(200).json(user);
  },

/* The `add` function in the `userController` is responsible for adding a new user to the system. */
  add: async function (req, res) {
    // console.log("parola din consola: " + req.body.password);
    bcrypt.hash(req.body.password, 10)
      .then((hashedPassword) => {
        // console.log("parola hashed: " + hashedPassword);
        let addedUser = userModel.addUser({
          name: req.body.name,
          email: req.body.email, 
          password: hashedPassword
        });
        res.status(200).json(addedUser); 
      })
      .catch((e) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      }); 
    // let addedUser = await userModel.addUser(req.body);


  },

/* The `loginUser` function in the `userController` is responsible for handling the login
functionality. It takes the email and password from the request body and passes them to the
`userLogin` function in the `userModel` module. */
  loginUser: async function (req, res) {
    let authUser = userModel.userLogin(req.body.email, req.body.password)
    
    // console.log(authUser);
    authUser.then((data) => {
      // console.log(data);
      res.status(200).json(data);
    })
      .catch((err) => {
        // console.log(err.message);
        res.status(500).send({
          message: err.message,
          err,
        });
      });


    // res.status(200).json(authUser); 

  },

  edit: async function (req, res) {
    let editedUser = userModel.editUser(
      req.params.id,
      req.body 
    );

    res.status(200).json(editedUser);
  },

  delete: async function (req, res) {
    let deletedUser = userModel.deleteUsers(req.params.id);

    res.status(200).json(deletedUser);
  }
};

module.exports = userController;
