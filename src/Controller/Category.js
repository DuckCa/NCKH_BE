const {
  getCategoryList,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../Service/CategoryService");

const getCategory = async (req, res) => {
  try {
    const data = await getCategoryList(req);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving category!!" });
  }
};
const putCategory = async (req, res) => {
  try {
    const { _id, Name, Description } = req.body;
    const data = await updateCategoryService({ _id, Name, Description });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating category!!" });
  }
};

const postCategory = async (req, res) => {
  try {
    const { Name, Description } = req.body;
    const data = await addCategoryService({ Name, Description });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding category!!" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteCategoryService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting category!!" });
  }
};

module.exports = { getCategory, putCategory, postCategory, deleteCategory };
