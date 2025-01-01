const {
  getUserItemService,

  addUserItemService,
  updateUserItemService,
  deleteUserItemService,
} = require("../Service/UserItemService");

const getUserItems = async (req, res) => {
  try {
    const { _id, type } = req.query;
    console.log(">>>CHECK UserId:", _id);
    const data = await getUserItemService({ _id, type });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error get UserItem!!" });
  }
};
const putUserItem = async (req, res) => {
  try {
    const { _id, username, email, password, bio, roleId } = req.body;

    const data = await updateUserItemService({
      _id,
      username,
      email,
      password,
      bio,
      roleId,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Account" });
  }
};

const postUserItem = async (req, res) => {
  try {
    const { username, email, password, bio, roleId, userItem } = req.body;

    const data = await addUserItemService(
      username,
      email,
      password,
      bio,
      roleId,
      userItem
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding Account" });
  }
};

const deleteUserItem = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteUserItemService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting Account" });
  }
};

module.exports = {
  getUserItems,
  putUserItem,
  postUserItem,
  deleteUserItem,
};
