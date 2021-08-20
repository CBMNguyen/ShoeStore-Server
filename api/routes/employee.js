const express = require("express");
const router = express.Router();
const upload = require("../utils/common");
const checkAuth = require("../midlewares/check-auth.js");

const employeeController = require("../controllers/employee");

router.post("/login", employeeController.employee_login);

router.get("/",checkAuth, employeeController.employee_getAll);

router.get("/:employeeId", checkAuth, employeeController.employee_getById);

router.post("/", checkAuth, upload.single("image"), employeeController.employee_create);

router.patch(
  "/:employeeId",checkAuth,
  upload.single("image"),
  employeeController.employee_update
);

router.delete("/:employeeId",checkAuth, employeeController.employee_delete);

module.exports = router;
