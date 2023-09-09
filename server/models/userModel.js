const users = require("../schemas/userSchema");

const bcrypt = require("bcrypt");

const userModel = {
  getAllUsers: async function () {
    return await users.find();
  },

  getUserById: async function (id) {
    return await users.findById(id);
  },

  getUserByName: async function (name) {
    return await users.findOne({ "name": name });
  },

  getUserByEmail: async function (email) {
    return await users.findOne({ "email": email });
  },

  // getUserByName: async function (name) {
  //   return this.getAllUsers().filter((currentUser) =>
  //     currentUser.fullName.includes(name)
  //   );
  // },

  addUser: async function (user) {
    return await users.create(user);
  },



  // editUser: async function (id, user) {
  //   let indexOfUserToEdit = this.users.findIndex(
  //     (currentUser) => currentUser.id === id
  //   );

  //   if (indexOfUserToEdit === -1) {
  //     throw new Error("User doesn't exist");
  //   }

  //   let originalUser = this.users[indexOfUserToEdit];

  //   let editedUser = {
  //     id: originalUser.id,
  //     firstName: user.firstName ? user.firstName : originalUser.firstName,
  //     lastName: user.lastName ? user.lastName : originalUser.lastName,
  //     email: user.email ? user.email : originalUser.email,
  //     password: user.password ? user.password : originalUser.password,
  //   };

  //   this.users[indexOfUserToEdit] = editedUser;
  //   return this.getAllUsers()[indexOfUserToEdit];
  // },

  editUser: async function (id, user) {
    return await users.findByIdAndUpdate(id, user, { new: true });
  },

/* The `userLogin` function is responsible for authenticating a user by checking their email and
password. */
  userLogin: async function (email, password) { 
 
    let user = await users.findOne({ "email": email });
    if (user) {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        // console.log("User is logged in " + user.name + " with password " + password);
        return user; 
      } else {
        throw new Error("Password is incorrect"); 
      }
    } else {
      throw new Error("User doesn't exist");
    }

  },
 
  // deleteUser: async function (id) {
  //   let indexOfUserToDelete = this.users.findIndex(
  //     (currentUser) => currentUser.id === id
  //   );

  //   if (indexOfUserToDelete === -1) {
  //     throw new Error("User doesn't exist");
  //   }

  //   return this.users.splice(indexOfUserToDelete, 1)[0];
  // },
  deleteUsers: async function (id) {
    let { deletedCount } = await users.deleteOne({ _id: id });
    return deletedCount;
  }
};




module.exports = userModel;

