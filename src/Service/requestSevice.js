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
  addRequestService: async (reqItem) => {
    const data = await RequestHistory.create({
      _UserId: reqItem._UserId,
      _RequestId: reqItem._RequestId,
      status: reqItem.status,
      Message: reqItem.Message,
    });
    return data;
  },
  addRequestTypeService: async (reqItem) => {
    console.log(
      ">>>>>CHECK REQUEST TYPE:",
      reqItem.Name,
      "-----",
      reqItem.Description
    );
    const data = await RequestType.create({
      Name: reqItem.Name,
      Description: reqItem.Description,
    });
    console.log(data);
    return data;
  },
  updateRequestTypeService: async (reqItem) => {
    const data = await RequestType.update(
      { Name: reqItem.Name, Description: reqItem.Description },
      { where: { _RequestId: reqItem._RequestId } }
    );
    return data;
  },

  deleteRequestService: async (reqItem) => {
    const data = await RequestHistory.destroy({
      where: {
        _UserId: reqItem._UserId,
        _RequestId: reqItem._RequestId,
      },
    });
    return data;
  },

  deleteRequestTypeService: async (_RequestId) => {
    const data = await RequestType.destroy({
      where: { _RequestId: _RequestId },
    });
    return data;
  },
};
