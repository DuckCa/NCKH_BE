const express = require("express");
const router = express.Router();
const {
  getAccounts,
  getAccountById,
  putAccount,
  postAccount,
  deleteAccount,
} = require("../Controller/Account");
const delay = require("../Middleware/delay.js");
router.all("*", delay); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

router.get("/Acc", getAccounts);
router.get("/Acc/:id", getAccountById);
router.put("/Acc", putAccount); // cập nhập data
router.post("/Acc", postAccount); //thêm data
router.delete("/Acc", deleteAccount);
module.exports = router;
