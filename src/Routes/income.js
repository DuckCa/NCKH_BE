const express = require("express");
const router = express.Router();
const {
  getIncomes,
  getIncomeById,
  putIncome,
  postIncome,
  deleteIncome,
} = require("../Controller/Income.js");
const delay = require("../Middleware/delay.js");
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

// router.get("/Income", getIncomeByToken);
router.get("/Income", author("read", "Income"), getIncomes);

router.put("/Income", author("manage", "Income"), putIncome); // cập nhập data
router.post("/Income", author("create", "Income"), postIncome); //thêm data
router.delete("/Income", author("manage", "Income"), deleteIncome);

module.exports = router;
