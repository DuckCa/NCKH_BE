const {
  getAccountList,
  getAccountByRoleService,
  getAccountByIdService,
  addAccountService,
  updateAccountService,
  deleteAccountService,
} = require("../Service/AccountService");

const getAccountByRole = async (req, res) => {
  const roleId = req.query._id;
  const data = await getAccountByRoleService(roleId);
  return res.status(200).json(data);
};
const getAccounts = async (req, res) => {
  try {
    let data;

    if (req?.query?._id || req?.user?._id) {
      const id = req.query._id;
      data = await getAccountByIdService(req);
    } else {
      data = await getAccountList(req);
    }

    if (!data || data.length === 0) {
      // Kiểm tra thêm data.length === 0 nếu cần
      return res.status(404).json({ message: "No accounts found" });
    }
    return res.status(200).json({ role: req?.user?.userRole, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Accounts" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const data = await getAccountByIdService(req);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Accounts" });
  }
};
const putAccount = async (req, res) => {
  try {
    const { _id, username, email, password, bio, roleId, coin, level } =
      req.body;

    const data = await updateAccountService({
      _id,
      username,
      email,
      password,
      bio,
      roleId,
      coin,
      level,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Account" });
  }
};

const postAccount = async (req, res) => {
  try {
    const { username, email, password, bio, roleId } = req.body;

    const data = await addAccountService(
      username,
      email,
      password,
      bio,
      roleId
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding Account" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    console.log(">>>CHECK ID DELETE:", req.query);
    const { _id } = req.query;

    const data = await deleteAccountService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting Account" });
  }
};

module.exports = {
  getAccounts,
  getAccountByRole,
  getAccountById,
  putAccount,
  postAccount,
  deleteAccount,
};
