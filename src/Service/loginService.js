const Account = require("../Model/Account");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const registerAccount = async (userName, email, password, role) => {
  const data = Account.create({ userName, email, password, role });
  return data;
};
const loginService = async (email, password) => {
  const data = await Account.findOne({ email: email }).exec();
  console.log(">>>>>>>>CHECK PASSWORD:", data.password);

  const access = await bcrypt.compare(password, data.password);
  if (email && access) {
    return "Login success";
  } else {
    return "Login failed";
  }
};

module.exports = { registerAccount, loginService };
