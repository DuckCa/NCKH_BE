const express = require("express");
const router = express.Router();
const {
  getBills,
  getBillsByYear,
  putBill,
  postBill,
  deleteBill,
} = require("../Controller/Bill");
const delay = require("../Middleware/delay.js");
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

// router.get("/Bill", getBillByToken);
router.get("/Bill", author("read", "Bill"), getBills);
router.get("/Bill/Year", author("read", "Bill"), getBillsByYear);
router.put("/Bill", author("manage", "Bill"), putBill); // cập nhập data
router.post("/Bill", author("create", "Bill"), postBill); //thêm data
router.delete("/Bill", author("manage", "Bill"), deleteBill);
//Manage Bill sau này sẽ do role Manager quản lý
module.exports = router;
