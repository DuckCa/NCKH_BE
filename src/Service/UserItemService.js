const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");
const getUserItemService = async (infor) => {
  console.log(">>>CHECK get userItem:", infor);
  const data = await UserItem.findAll({
    where: { userId: infor._id, type: infor.type },
  });
  return data;
};
const addUserItemService = async () => {};
const updateUserItemService = async () => {};
const deleteUserItemService = async () => {};
module.exports = {
  getUserItemService,
  addUserItemService,
  updateUserItemService,
  deleteUserItemService,
};
