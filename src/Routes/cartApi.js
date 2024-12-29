const express = require("express");
const router = express.Router();
const { getCarts, putCart, deleteCart } = require("../Controller/Cart");
const delay = require("../Middleware/delay.js");
const authen = require("../Middleware/authen.js");
const author = require("../Middleware/author.js");
router.all("*", authen); //"*" có nghĩa là tất cả router con sẽ phải thông qua đoạn code này và chạy vào delay trước

// router.get("/Cart", getCartByToken);
router.get("/Cart", author("manage", "Cart"), getCarts);
router.put("/Cart", author("manage", "Cart"), putCart); // cập nhập data

module.exports = router;
