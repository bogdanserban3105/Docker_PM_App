const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String, required: true, 
      index: {
        unique: true,
        dropDups: true
      }
    },
    password: { type: String, required: true },
    role : { type: String, required: true, default: 'member' },
    // tasks: [{ type: mongoose.Types.ObjectId, ref: "Tasks" }],
    created: { type: Date, default: Date.now },

  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);
