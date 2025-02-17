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
const addUserItemService = async (infor) => {
  try {
    console.log(">>>CHECK user item:", infor);
    const data = await UserItem.create({
      item: infor.item,
      type: infor.type,
      userId: infor.userId,
    });
    return data;
  } catch (error) {
    return error;
  }
};
const updateUserItemService = async () => {};
const deleteUserItemService = async () => {};
module.exports = {
  getUserItemService,
  addUserItemService,
  updateUserItemService,
  deleteUserItemService,
};
