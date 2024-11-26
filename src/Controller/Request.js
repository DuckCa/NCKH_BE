const {
  getRequestList,
  getRequestType,
  addRequestService,
  updateRequestTypeService,
  deleteRequestService,
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
    return res.status(500).json({ message: "Error post Request Type List" });
  }
};

const putRequest = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
};

const deleteRequest = async (req, res) => {
  const userId = req.params.id;
  users = users.filter((u) => u.id !== userId);
  res.status(204).send();
};

module.exports = {
  getRequests,
  getRequestsType,
  putRequest,
  postRequest,
  deleteRequest,
};
