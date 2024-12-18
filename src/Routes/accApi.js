const express = require("express");
const router = express.Router();
const {
  getAccounts,
  getAccountById,
  putAccount,
  postAccount,
  deleteAccount,
} = require("../Controller/Account");
router.get("/Acc", getAccounts);
router.get("/Acc/:id", getAccountById);
router.put("/Acc", putAccount); // cập nhập data
router.post("/Acc", postAccount); //thêm data
router.delete("/Acc", deleteAccount);
module.exports = router;
