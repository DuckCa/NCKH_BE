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
    //Hai loai update, update wishlist va update phan con lai

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
    console.log(">>>>>>>>CHECK FILE:", req.files);
    const file = await uploadSingleFile(req.files);
    const { name, description, artist, category, price } = req.body;
    const data = await addItemService(
      name,
      description,
      JSON.parse(artist),
      JSON.parse(category),
      price,
      file.path
    );

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
