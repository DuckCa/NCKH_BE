const express = require("express");
const router = express.Router();
const {
  getItems,
  putItem,
  postItem,
  deleteItem,
} = require("../Controller/Item");
router.get("/item", getItems);
router.put("/item", putItem); // cập nhập data
router.post("/item", postItem); //thêm data
router.delete("/item", deleteItem);
module.exports = router;
