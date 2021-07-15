const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controllers/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.get("/", userController.user_getAll);

router.get("/:userId", userController.user_get);

router.patch("/:userId", upload.single("image"), userController.user_update);

router.delete("/:userId", userController.user_delete);

module.exports = router;
