const express = require("express");
const router = express.Router();
const {
  getCategory,
  putCategory,
  postCategory,
  deleteCategory,
} = require("../Controller/Category");

const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

router.get("*", author("read", "Category"), authen);
router.get("/category", author("read", "Category"), getCategory);
router.put("/category", author("create", "Category"), putCategory); // cập nhập data
router.post("/category", author("manage", "Category"), postCategory); //thêm data
router.delete("/category", author("manage", "Category"), deleteCategory);
module.exports = router;
