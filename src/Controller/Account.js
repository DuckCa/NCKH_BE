const {
  getAccountList,
  getAccountByIdService,
  addAccountService,
  updateAccountService,
  deleteAccountService,
} = require("../Service/AccountService");

const getAccounts = async (req, res) => {
  try {
    const data = await getAccountList(req);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Accounts" });
  }
};
const getAccountById = async (req, res) => {
  try {
    const data = await getAccountByIdService(req.param);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Accounts" });
  }
};
const putAccount = async (req, res) => {
  try {
    const { _id, username, email, password, bio, roleId } = req.body;

    const data = await updateAccountService({
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

const postAccount = async (req, res) => {
  try {
    const { username, email, password, bio, roleId, userItem } = req.body;

    const data = await addAccountService(
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

const deleteAccount = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteAccountService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting Account" });
  }
};

module.exports = {
  getAccounts,
  getAccountById,
  putAccount,
  postAccount,
  deleteAccount,
};
