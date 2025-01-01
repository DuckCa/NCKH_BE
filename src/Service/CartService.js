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
  console.log(">>>>Check Cart:", cart);
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Kiểm tra giá trị của type
  if (infor.type === "Add") {
    // Thêm item mới vào mảng item (nếu chưa tồn tại)
    if (!cart.item.includes(infor.item)) {
      cart.item.push(infor.item);
    }
  } else if (infor.type === "Delete") {
    // Xóa item trong mảng item (nếu có tồn tại)
    const itemIndex = cart.item.indexOf(infor.item);
    if (itemIndex !== -1) {
      cart.item.splice(itemIndex, 1);
    }
  } else {
    throw new Error("Invalid type. Type must be 'Add' or 'Delete'.");
  }

  // Lưu giỏ hàng đã cập nhật
  const updatedCart = await cart.save();

  return updatedCart;
};

module.exports = { getCartById, updateCartService };
