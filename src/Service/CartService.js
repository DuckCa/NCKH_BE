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
  console.log(">>>CHECK Item from FE:", infor.item);

  // Lấy giỏ hàng hiện tại
  const cart = await Cart.findById(infor._id);
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Thêm item mới vào mảng item (nếu chưa tồn tại)
  if (!cart.item.includes(infor.item)) {
    cart.item.push(infor.item);
  }

  // Lưu giỏ hàng đã cập nhật
  const updatedCart = await cart.save();

  return updatedCart;
};

module.exports = { getCartById, updateCartService };
