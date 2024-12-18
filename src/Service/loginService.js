const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");
require("dotenv").config;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const registerAccount = async (userName, email, password, role) => {
  const data = Account.create({ userName, email, password, role });
  return data;
};
const loginService = async (email, password) => {
  const data = await Account.findOne({
    where: { email: email },
  });
  console.log(">>>>>>>>CHECK PASSWORD:", data.password);

  if (data.email && data.password) {
    const payload = {
      email: data.email,
      username: data.username,
    };
    const access_token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return (
      // access_token,
      {
        email: data.email,
        username: data.username,
      }
    );
  } else {
    return "Login failed";
  }
  // const access = await bcrypt.compare(password, data.password);
  // if (email && access) {
  //   const payload = {
  //     email: data.email,
  //     username: data.username,
  //   };
  //   const access_token = await jwt.sign(payload, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRE,
  //   });
  //   return (
  //     // access_token,
  //     {
  //       email: data.email,
  //       username: data.username,
  //     }
  //   );
  // } else {
  //   return "Login failed";
  // }
};

module.exports = { registerAccount, loginService };
