const express = require("express");
const router = express.Router();
const {
  getRequests,
  getRequestsType,
  putRequestType,
  postRequest,
  postRequestType,
  deleteRequest,
  deleteRequestType,
} = require("../Controller/Request");
router.get("/request", getRequests);
router.post("/request", postRequest); //thêm data
router.delete("/request", deleteRequest);
router.get("/reqtype", getRequestsType);
router.post("/reqtype", postRequestType);
router.put("/reqtype", putRequestType);
router.delete("/reqtype", deleteRequestType);
module.exports = router;
