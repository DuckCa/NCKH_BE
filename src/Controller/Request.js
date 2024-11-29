const {
  getRequestList,
  getRequestType,
  addRequestService,
  addRequestTypeService,
  updateRequestService,
  updateRequestTypeService,
  deleteRequestService,
  deleteRequestTypeService,
} = require("../Service/requestSevice");

const getRequests = async (req, res) => {
  try {
    const data = await getRequestList();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error get Request List" });
  }
};

const getRequestsType = async (req, res) => {
  try {
    const data = await getRequestType();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error get Request Type List" });
  }
};
const postRequest = async (req, res) => {
  try {
    const data = await addRequestService();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error post Request List" });
  }
};
const postRequestType = async (req, res) => {
  try {
    const data = await addRequestTypeService();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error post Request Type List" });
  }
};
const putRequest = async (req, res) => {
  try {
    const data = await updateRequestService();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error put Request List" });
  }
};
const putRequestType = async (req, res) => {
  try {
    const data = await updateRequestTypeService();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error put Request Type List" });
  }
};
const deleteRequest = async (req, res) => {
  try {
    const data = await deleteRequestService();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error delete Request List" });
  }
};
const deleteRequestType = async (req, res) => {
  try {
    const data = await deleteRequestTypeService();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error delete Request Type List" });
  }
};
module.exports = {
  getRequests,
  getRequestsType,
  putRequest,
  putRequestType,
  postRequest,
  postRequestType,
  deleteRequest,
  deleteRequestType,
};
