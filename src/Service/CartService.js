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
  try {
    let update;
    if (infor.type === "Add") {
      update = { $addToSet: { item: infor.item } };
    } else if (infor.type === "Delete") {
      update = { $pull: { item: infor.item } };
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { _id: infor._id },
      update,
      { new: true } // Trả về document sau khi update
    );

    if (!updatedCart) {
      throw new Error("Cart not found");
    }

    return updatedCart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

module.exports = { getCartById, updateCartService };
