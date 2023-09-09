const taskModel = require("../models/taskModel");

const taskController = {
    getAll: async function (req, res) {
        let tasks = await taskModel.getAllTasks();

        res.status(200).json(tasks);
    },

    getByID: async function (req, res) {
        let task = await taskModel.getTaskByID(req.params.id);

        res.status(200).json(task);
    },
    getByIDD: async function (req, res) {

        let task = await taskModel.getTaskByIDD(parseInt(req.params.id));

        res.status(200).json(task);
    },
    add: async function (req, res) {
        let addedtask = await taskModel.addTask(req.body);

        res.status(201).json(addedtask);
    },

    edit: async function (req, res) {
        let editedtask = await taskModel.editTask(req.params.id, req.body);

        res.status(201).json(editedtask);
    },

    delete: async function (req, res) {
        let deletedtask = await taskModel.deleteTask(req.params.id);

        res.status(201).json(deletedtask);
    }
}

module.exports = taskController;