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
router.get("/role", author("manage", "Role"), getRoles);
router.get("/matchrole", author("manage", "Role"), getMatchRoles);
router.put("/role", author("manage", "Role"), putRole); // cập nhập data
router.post("/role", author("manage", "Role"), postRole); //thêm data
router.delete("/role", author("manage", "Role"), deleteRole);
module.exports = router;
