const express = require("express");
const router = express.Router();
const {
  getTerms,
  putTerm,
  postTerm,
  deleteTerm,
} = require("../Controller/Term.js");
const delay = require("../Middleware/delay.js");
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

// router.get("/Income", getIncomeByToken);
router.get("/Term", getTerms);

router.put("/Term", putTerm); // cập nhập data
router.post("/Term", postTerm); //thêm data
router.delete("/Income", deleteTerm);

module.exports = router;
