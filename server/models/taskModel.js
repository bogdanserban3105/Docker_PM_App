const tasksDB = require("../schemas/taskSchema");

const taskModel = {
    getAllTasks: async function () {
        return await tasksDB.find();
    },

    getTaskByIDD: async function (idd) {
        return await tasksDB.findOne({ "id" : idd });
    },
    getTaskByID: async function (id) {
        return await tasksDB.findById(id);
    },

    addTask: async function (task) {
        return await tasksDB.create(task);
    },

    editTask: async function (id, task) {
        return await tasksDB.findByIdAndUpdate(id, task, { new: true });
    },

    deleteTask: async function (id) {
        let { deletedCount } = await tasksDB.deleteOne({ _id: id });
        return deletedCount;
    }
}

module.exports = taskModel;