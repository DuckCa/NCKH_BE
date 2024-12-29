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
const getCartById = async (_id) => {
  console.log(">>CHECK CART ID:", _id);
  const dataItem = await Cart.findById(_id);

  return dataItem;
};

const updateCartService = async (infor) => {
  const data = await Cart.updateOne(
    { _id: infor._id },
    { item: JSON.parse(infor.item) }
  );

  return data;
};

module.exports = { getCartById, updateCartService };
