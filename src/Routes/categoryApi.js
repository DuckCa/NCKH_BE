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
router.get("*", author("read", "Category"));
router.post("*", author("manage", "Category"));
router.put("*", author("create", "Category"));
router.delete("*", author("manage", "Category"));

router.get("*", authen);
router.get("/category", getCategory);
router.put("/category", putCategory); // cập nhập data
router.post("/category", postCategory); //thêm data
router.delete("/category", deleteCategory);
module.exports = router;
