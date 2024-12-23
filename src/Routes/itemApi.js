const express = require("express");
const router = express.Router();
const {
  getItems,
  putItem,
  postItem,
  deleteItem,
} = require("../Controller/Item");
const author = require("../Middleware/author.js");
const authen = require("../Middleware/authen.js");

router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước
router.get("*", author("read", "Item"));
router.post("*", author("create", "Item"));
router.put("*", author("update", "Item"));
router.delete("*", author("delete", "Item"));

router.get("/item", getItems);
router.put("/item", putItem); // cập nhập data
router.post("/item", postItem); //thêm data
router.delete("/item", deleteItem);
module.exports = router;
