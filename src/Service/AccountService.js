const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");
const Cart = require("../Model/Cart");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const getAccountList = async (req) => {
  const data = await Account.findAll();
  const sanitizedData = data.map((item) => {
    const { password, ...rest } = item.dataValues;
    return rest;
  });
  return sanitizedData;
};
const getAccountByRoleService = async (_id) => {
  const getRoleUser = await MatchRole.findAll({
    where: { roleId: _id },
  });

  // Lấy danh sách accountId từ kết quả của MatchRole.findAll
  const accountIds = getRoleUser.map((role) => role.dataValues.accountId);

  // Dùng Promise.all để tìm tất cả các account bằng Account.findByPk
  const accounts = await Promise.all(
    accountIds.map((id) => Account.findByPk(id))
  );

  return accounts;
};
const getAccountByIdService = async (req) => {
  const data = await Account.findOne({
    where: { _id: req.query._id ?? req.user._id },
  });

  const { password, ...rest } = data.dataValues;

  return rest;
};

const updateAccountService = async (infor) => {
  const findUserById = await MatchRole.findOne({
    where: { accountId: infor._id },
  });
  console.log(
    ">>>>>>>CHECK TYPE:",
    typeof findUserById.roleId,
    "AND: ",
    typeof Number(infor.roleId)
  );
  console.log(
    ">>>>>>>CHECK VALUE:",
    findUserById.roleId,
    "AND: ",
    Number(infor.roleId)
  );
  if (Number(infor.roleId) !== findUserById.roleId) {
    const updateRoleUser = await MatchRole.update(
      { roleId: infor.roleId },
      { where: { accountId: infor._id } }
    );
    if (updateRoleUser) {
      console.log(">>>>>CHANGE ROLE SUCCESS!!!!!!");
    }
  } else {
    console.log(">>>>>Role NOT CHANGE!!!!!!");
  }
  const data = await Account.update(
    {
      username: infor.username,
      email: infor.email,
      password: infor.password,
      bio: infor.bio,
      coin: infor.coin,
      level: infor.level,
    },
    {
      where: { _id: infor._id },
    }
  );
  return data;
};
//Function dành cho admin để tạo các account đặc biệt
const addAccountService = async (username, email, password, bio, roleId) => {
  const cart = await Cart.create({});
  const existingCart = await Cart.findById(cart._id);

  if (!existingCart) {
    console.log("CART WAS NOT CREATED!!!!!");

    return Error("Cart was not created successfully.");
  } else {
    console.log("CART CREATED SUCCESS!!!!!");
    console.log(">>>>>CHECK CART:", existingCart);
  }
  console.log(
    `>>>>>>CHECK Before ACCOUNT: USERNAME: ${username}, EMAIL: ${email}, PASSWORD: ${password}, CARTID: ${cart}, BIO: ${bio} `
  );
  const passwordDecoded = await bcrypt.hash(password, saltRounds);
  const data = await Account.create({
    username: username,
    email: email,
    password: passwordDecoded,
    cart: cart._id.toString(),
    bio: bio,
  });

  // const inputstring = userItem === "true";
  // const accountItem = await UserItem.create({
  //   type: inputstring,
  //   userId: data._id,
  // });

  console.log(
    `>>>>>>CHECK BEFORE MATCHTROLE, ACCOUNTID: ${data._id}, ROLEID: ${roleId}`
  );
  const matchrole = await MatchRole.create({
    accountId: data._id,
    roleId: roleId,
  });

  return data;
};

const deleteAccountService = async (_id) => {
  const account = await Account.findOne({
    where: { _id: _id },
  });
  const data = await Account.destroy({ where: { _id: _id } });
  const delMatchRole = await MatchRole.destroy({ where: { accountId: _id } });
  console.log(">>>>>>>CHECK CART:", account.cart);
  const delCart = await Cart.delete({
    _id: account.cart,
    // _id: account.cart.replace(/"/g, "") code cũ
  });

  return data;
};
module.exports = {
  getAccountList,
  getAccountByRoleService,
  getAccountByIdService,
  addAccountService,
  updateAccountService,
  deleteAccountService,
};
