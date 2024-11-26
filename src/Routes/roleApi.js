const express = require("express");
const router = express.Router();
const {
  getRoles,
  getMatchRoles,
  putRole,
  postRole,
  deleteRole,
} = require("../Controller/Role");
router.get("/role", getRoles);
router.get("/matchrole", getMatchRoles);
router.put("/role", putRole); // cập nhập data
router.post("/role", postRole); //thêm data
router.delete("/role", deleteRole);
module.exports = router;
