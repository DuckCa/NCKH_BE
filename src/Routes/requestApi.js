const express = require("express");
const router = express.Router();
const {
    getRequests,
    putRequest,
    postRequest,
    deleteRequest,
} = require("../Controller/Request");
router.get("/item", getRequests);
router.put("/item", putRequest); // cập nhập data
router.post("/item", postRequest); //thêm data
router.delete("/item", deleteRequest);
module.exports = router;