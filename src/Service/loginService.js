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
  const passwordDecoded = await bcrypt.hash(password, saltRounds);
  const data = Account.create({ userName, email, passwordDecoded, role });
  return data;
};
const loginService = async (email, password) => {
  const data = await Account.findOne({
    where: { email: email },
  });
  console.log(">>>>>>>>CHECK PASSWORD:", data.password);
  if (data) {
    const isMatchPassword = await bcrypt.compare(password, data.password);
    if (isMatchPassword) {
      const userRole = await MatchRole.findAll({
        where: {
          accountId: data._id,
        },
      });
      const roleIds = userRole.map((role) => role.dataValues.roleId);

      console.log(">>>>>>>>>>>CHECK USER BEFORE RETURN:", roleIds); // Kết quả: Mảng chứa các giá trị roleId
      const payload = {
        _id: data._id,
        email: data.email,
        username: data.username,
        userRole: roleIds,
      };
      console.log(">>>>>CHECK PAYLOAD:", payload);
      const access_token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      console.log(">>>>>>>CHECK TOKEN:", access_token);

      return {
        EC: 0,
        access_token,
        user: {
          _id: data._id,
          email: data.email,
          username: data.username,
          userRole: roleIds,
        },
      };
    } else {
      return {
        EC: 2,
        EM: "Wrong password, please try again!!!",
      };
    }
  } else {
    return {
      EC: 1,
      EM: "Wrong email or password!!!",
    };
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
