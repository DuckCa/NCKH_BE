const {
  getItemList,
  getItemByCate,
  getItemById,
  addItemService,
  updateItemService,
  deleteItemService,
} = require("../Service/ItemService");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../Service/fileService");
const mongoose = require("mongoose");
const getItems = async (req, res) => {
  try {
    if (req?.query?._id) {
      const { _id, getArtistId } = req.query;
      const data = await getItemById({ _id, getArtistId });
      return res.status(200).json(data);
    } else {
      const data = await getItemList();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Items" });
  }
};
const getItemByCategory = async (req, res) => {
  try {
    if (req?.query?._id) {
      const { _id } = req.query;
      console.log("req?.query?._id:", _id);
      const data = await getItemByCate(_id);
      return res.status(200).json(data);
    } else {
      const data = await getItemList();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Items" });
  }
};

const putItem = async (req, res) => {
  try {
    const { _id, name, description, artist, category, price, state } = req.body;

    console.log(
      `>>>>>>>>>>>>CHECK: ${_id},${name} , ${description},${artist} ,${category} ,${price} ,${state} }`
    );

    const data = await updateItemService({
      _id,
      name,
      description,
      artist,
      category,
      price,
      state,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Item" });
  }
};

const postItem = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>CHECK request file:", req);
    const file = await uploadSingleFile(req?.files?.url);
    const { name, description, artist, category, price } = req.body;
    const { _id } = req.user;
    // const categoryArray = JSON.parse(category).map((cat) =>
    //   mongoose.Types.ObjectId(cat)
    // );
    console.log(">>>>>>>>>>>>>>>CHECK file", file);
    const url = file.paths.watermarked.replace(/\\/g, `/`);
    const originlUrl = file.paths.original.replace(/\\/g, `/`);
    console.log(
      ">>>>>>>>>>>>CHECKKK INFOR AT CONTROLLER:",
      name,
      description,
      typeof JSON.parse(artist),
      typeof JSON.stringify(category),
      price,
      url,
      originlUrl
    );

    // Xử lý `category` (danh sách ObjectId)
    const userId = _id;
    const data = await addItemService({
      userId,
      name,
      description,
      artist,
      category,
      price,
      url,
      originlUrl,
    });
    console.log(">>>CHECK data return addItem:", data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding Item" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteItemService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting Item" });
  }
};

module.exports = { getItems, getItemByCategory, putItem, postItem, deleteItem };
