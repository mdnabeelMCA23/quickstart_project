const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/taskController");

router.post("/",auth,ctrl.createTask);
router.get("/",auth,ctrl.getTasks);
router.put("/:id",auth,ctrl.updateTask);
router.delete("/:id",auth,ctrl.deleteTask);
router.patch("/:id/status",auth,ctrl.changeStatus);

module.exports = router;
