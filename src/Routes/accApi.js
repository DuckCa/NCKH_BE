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
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước
router.post("*", author("update", "Account"));
router.put("*", author("manage", "Account"));
router.delete("*", author("manage", "Account"));

router.get("/Acc", author("read", "Account"), getAccounts);
router.get("/Acc/:id", author("read", "Account"), getAccountById);
router.put("/Acc", putAccount); // cập nhập data
router.post("/Acc", postAccount); //thêm data
router.delete("/Acc", deleteAccount);
module.exports = router;
