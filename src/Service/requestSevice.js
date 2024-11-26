const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
  RequestType,
} = require("../Model/Index");
module.exports = {
  getRequestList: async () => {
    const data = await RequestHistory.findAll();
    return data;
  },
  getRequestType: async () => {
    const data = await RequestType.findAll();
    return data;
  },
  addRequestService: async () => {
    const data = await RequestHistory.create();
    return data;
  },
  updateRequestTypeService: async () => {
    const data = await RequestHistory.findAll();
    return data;
  },
  deleteRequestService: async () => {
    const data = await RequestHistory.findAll();
    return data;
  },
};
