const express = require("express");
const router = express.Router();
const {
  getUserItems,
  putUserItem,
  postUserItem,
  deleteUserItem,
} = require("../Controller/UserItem.js");
const delay = require("../Middleware/delay.js");
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

// router.get("/userItem", getuserItemByToken);
router.get("/userItem", author("manage", "userItem"), getUserItems);

router.put("/userItem", author("manage", "userItem"), putUserItem); // cập nhập data
router.post("/userItem", author("manage", "userItem"), postUserItem); //thêm data
router.delete("/userItem", author("manage", "userItem"), deleteUserItem);

module.exports = router;
