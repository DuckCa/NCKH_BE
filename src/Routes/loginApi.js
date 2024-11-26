const express = require("express");
const router = express.Router();
const {
  getInfor,
  loginApi,
  registerApi,
  forgetPassword,
} = require("../Controller/Login");
router.get("/login", getInfor);
router.get("/login", loginApi);
router.put("/register", registerApi);
router.get("/forgetpassword", forgetPassword);
module.exports = router;
