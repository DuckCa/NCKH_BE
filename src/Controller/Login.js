const { registerAccount, loginService } = require("../Service/loginService");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const getInfor = async (req, res) => {
  return res.status(200).json("Hello World");
};
const loginApi = async (req, res) => {
  const { email, password } = req.body;
  console.log(
    ">>>>>>>>>>>>>>>CHECK DATA FROM FE 1.email:",
    email,
    " 2.password:",
    password
  );
  const data = await loginService(email, password);
  return res.status(200).json(data);
};
const registerApi = async (req, res) => {
  console.log(">>>>>>>>CHECK ACCOUNT:", req.body);
  const { userName, email, password, role } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const data = await registerAccount(userName, email, hashPassword, role);
  return res.status(200).json(data);
};

const forgetPassword = async (req, res) => {
  return res.status(200).json("Forget Password");
};
module.exports = { getInfor, loginApi, registerApi, forgetPassword };
