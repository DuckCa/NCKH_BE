const express = require("express");
const router = express.Router();
const {
  getAccountByRole,
  getAccounts,
  getAccountById,
  putAccount,
  postAccount,
  deleteAccount,
} = require("../Controller/Account");
const delay = require("../Middleware/delay.js");
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.get("/Artist", getAccountById);
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

// router.get("/Account", getAccountByToken);
router.get("/Acc", author("read", "Account"), getAccounts);

router.get("/Account", author("read", "Account"), getAccountByRole);
router.put("/Acc", author("update", "Account"), putAccount); // cập nhập data
router.post("/Acc", author("create", "NormalAccount"), postAccount); //thêm data
router.delete("/Acc", author("manage", "Account"), deleteAccount);

module.exports = router;
