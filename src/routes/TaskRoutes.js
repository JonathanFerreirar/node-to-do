const express = require("express");

const router = express.Router();

const TaskController = require("../controller/TaskController");
const TaskValidation = require("../middlewares/TaskValidation");
const MacValidation = require("../middlewares/MacValidation");

router.post("/", TaskValidation, TaskController.create);

router.put("/:id", TaskValidation, TaskController.update);

router.get("/filter/all", MacValidation, TaskController.all);

module.exports = router;
