const { getCartById, updateCartService } = require("../Service/CartService");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../Service/fileService");
const mongoose = require("mongoose");
const getCarts = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(">>>>CHECK CART:", req.query);
    const data = await getCartById(_id);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Cart!!" });
  }
};

const putCart = async (req, res) => {
  try {
    const { _id, item, type } = req.body;
    console.log(">>CHECK at controller. ID:", _id, "AND item:", item);
    const data = await updateCartService({
      _id,
      item,
      type,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Cart" });
  }
};

module.exports = { getCarts, putCart };
