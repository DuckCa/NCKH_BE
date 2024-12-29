const { getCartById, updateCartService } = require("../Service/CartService");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../Service/fileService");
const mongoose = require("mongoose");
const getCarts = async (req, res) => {
  try {
    const _id = req.body._id;
    const data = await getCartById(_id);
    console.log(">>>>CHECK Cart:", data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Cart!!" });
  }
};

const putCart = async (req, res) => {
  try {
    const { _id, item } = req.body;

    const data = await updateCartService({
      _id,
      item,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Cart" });
  }
};

module.exports = { getCarts, putCart };
