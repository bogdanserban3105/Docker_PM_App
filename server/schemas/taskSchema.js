const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String, required: true},
    isChecked: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    assigned: { type: String, default: null },
    created: { type: Date, default: Date.now },
    description: { type: String, default: null },
    deadline: { type: Date, default: null },
    status: { type: String, default: "Not Started" },


}
);

module.exports = mongoose.model("Tasks", taskSchema);