const express = require("express");
const router = express.Router();
const {
  getRoles,
  putRole,
  postRole,
  deleteRole,
} = require("../Controller/Role");
router.get("/", getRoles);
router.put("/role", putRole); // cập nhập data
router.post("/role", postRole); //thêm data
router.delete("/role", deleteRole);
module.exports = router;
