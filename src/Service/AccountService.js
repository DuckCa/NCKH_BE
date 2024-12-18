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
const getAccountList = async (req) => {
  const data = await Account.findAll();
  return data;
};
const getAccountByIdService = async (id) => {
  const data = await Account.findById(id);
  return data;
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
    },
    {
      where: { _id: infor._id },
    }
  );
  return data;
};
//Function dành cho admin để tạo các account đặc biệt
const addAccountService = async (
  username,
  email,
  password,
  bio,
  roleId,
  userItem
) => {
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
  const data = await Account.create({
    username: username,
    email: email,
    password: password,
    cart: JSON.stringify(cart._id),
    bio: bio,
  });

  const inputstring = userItem === "true";
  const accountItem = await UserItem.create({
    type: inputstring,
    userId: data._id,
  });

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
    _id: account.cart.replace(/"/g, ""),
  });

  return data;
};
module.exports = {
  getAccountList,
  addAccountService,
  updateAccountService,
  deleteAccountService,
};
