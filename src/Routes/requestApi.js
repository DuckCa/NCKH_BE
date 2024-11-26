const express = require("express");
const router = express.Router();
const {
  getRequests,
  getRequestsType,
  putRequest,
  postRequest,
  deleteRequest,
} = require("../Controller/Request");
router.get("/request", getRequests);
router.get("/request", getRequestsType);
router.put("/request", putRequest); // cập nhập data
router.post("/request", postRequest); //thêm data
router.delete("/request", deleteRequest);
module.exports = router;
