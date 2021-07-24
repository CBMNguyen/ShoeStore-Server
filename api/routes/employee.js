const express = require("express");
const router = express.Router();
const upload = require("../utils/common");

const employeeController = require("../controllers/employee");

router.get("/", employeeController.employee_getAll);

router.get("/:employeeId", employeeController.employee_getById);

router.post("/", upload.single("image"), employeeController.employee_create);

router.patch(
  "/:employeeId",
  upload.single("image"),
  employeeController.employee_update
);

router.delete("/:employeeId", employeeController.employee_delete);

module.exports = router;
