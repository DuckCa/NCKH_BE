const {
  getItemList,
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
    const data = await getItemList(req);
    return res.status(200).json(data);
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
    // const categoryArray = JSON.parse(category).map((cat) =>
    //   mongoose.Types.ObjectId(cat)
    // );
    console.log(">>>>>>>>>>>>>>>CHECK file", file);
    const url = file.path.replace(/\\/g, `/`);
    console.log(
      ">>>>>>>>>>>>CHECKKK INFOR AT CONTROLLER:",
      name,
      description,
      typeof JSON.parse(artist),
      typeof JSON.stringify(category),
      price,
      url
    );

    // Xử lý `category` (danh sách ObjectId)

    const data = await addItemService({
      name,
      description,
      artist,
      category,
      price,
      url,
    });

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

module.exports = { getItems, putItem, postItem, deleteItem };
