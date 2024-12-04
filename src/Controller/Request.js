const {
  getRequestList,
  getRequestType,
  addRequestService,
  addRequestTypeService,
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
    const { _UserId, _RequestId, status, Message } = req.body;
    const data = await addRequestService({
      _UserId,
      _RequestId,
      status,
      Message,
    });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error post Request" });
  }
};
const postRequestType = async (req, res) => {
  try {
    const { Name, Description } = req.body;

    const data = await addRequestTypeService({ Name, Description });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error post Request Type" });
  }
};
const putRequestType = async (req, res) => {
  try {
    const { _RequestId, Name, Description } = req.body;
    const data = await updateRequestTypeService({
      _RequestId,
      Name,
      Description,
    });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error put Request Type" });
  }
};
const deleteRequest = async (req, res) => {
  try {
    const { _UserId, _RequestId } = req.body;
    const data = await deleteRequestService({ _UserId, _RequestId });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error delete Request" });
  }
};
const deleteRequestType = async (req, res) => {
  try {
    const { _RequestId } = req.body;
    const data = await deleteRequestTypeService(_RequestId);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error delete Request Type" });
  }
};
module.exports = {
  getRequests,
  getRequestsType,
  putRequestType,
  postRequest,
  postRequestType,
  deleteRequest,
  deleteRequestType,
};
