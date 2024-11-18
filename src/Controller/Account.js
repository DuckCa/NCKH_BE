const {
  getAccountList,
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

const putAccount = async (req, res) => {
  try {
    const { userName, email, password, bio, roleId, userItem } = req.body;

    console.log(
      `>>>>>>>>>>>>CHECK: ${_id},${userName} , ${email},${password} ,${wishlist} ,${bio} ,${portfolio} }`
    );
    //Hai loai update, update wishlist va update phan con lai
    if (wishlist) {
      const data = await updateAccountService({ _id, wishlist });
      return res.status(200).json(data);
    } else {
      const data = await updateAccountService({
        _id,
        userName,
        email,
        password,
        bio,
        portfolio,
      });
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Account" });
  }
};

const postAccount = async (req, res) => {
  try {
    const { userName, email, password, bio, roleId } = req.body;
    const data = await addAccountService(
      userName,
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
    const { _id } = req.body;
    const data = await deleteAccountService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting Account" });
  }
};

module.exports = { getAccounts, putAccount, postAccount, deleteAccount };
