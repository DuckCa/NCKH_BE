const express = require("express");
const router = express.Router();
const {
  getRoles,
  getMatchRoles,
  putRole,
  postRole,
  deleteRole,
} = require("../Controller/Role");

const author = require("../Middleware/author.js");
const authen = require("../Middleware/authen.js");
router.all("*", authen);
router.all("*", author("manage", "Role"));
router.get("/role", getRoles);
router.get("/matchrole", getMatchRoles);
router.put("/role", putRole); // cập nhập data
router.post("/role", postRole); //thêm data
router.delete("/role", deleteRole);
module.exports = router;
