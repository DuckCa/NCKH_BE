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

router.get("/item", author("read", "Item"), getItems);
router.put("/item", author("update", "Item"), putItem); // cập nhập data
router.post("/item", author("create", "Item"), postItem); //thêm data
router.delete("/item", author("delete", "Item"), deleteItem);
module.exports = router;
