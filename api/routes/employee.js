const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const checkAuth = require("../midlewares/check-auth.js");

const employeeController = require("../controllers/employee");
const checkEmployeeRole = require("../midlewares/check-employee-role");

router.post("/login", employeeController.employee_login);

router.get("/", employeeController.employee_getAll);

router.get("/:employeeId", checkEmployeeRole, employeeController.employee_getById);

router.post("/", checkEmployeeRole, upload.single("image"), employeeController.employee_create);

router.patch(
  "/:employeeId",
  checkEmployeeRole,
  upload.single("image"),
  employeeController.employee_update
);

router.delete("/:employeeId", checkEmployeeRole, employeeController.employee_delete);

module.exports = router;
