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
const author = require("../Middleware/author.js");
const authen = require("../Middleware/authen.js");
router.all("*", authen);

router.get("/request", author("read", "Request"), getRequests);
router.post("/request", author("create", "Request"), postRequest); //thêm data
router.delete("/request", deleteRequest);
router.get("/reqtype", author("read", "Request"), getRequestsType);
router.post("/reqtype", author("create", "Request"), postRequestType);
router.put("/reqtype", author("manage", "Request"), putRequestType);
router.delete("/reqtype", author("delete", "Request"), deleteRequestType);
module.exports = router;
