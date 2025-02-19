const {
  getCategoryList,
  getCategoryById,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../Service/CategoryService");

const getCategory = async (req, res) => {
  try {
    if (req?.query?._id) {
      const { _id } = req.query;
      console.log("req?.query?._id:", _id);
      const data = await getCategoryById(_id);
      return res.status(200).json(data);
    } else {
      const data = await getCategoryList(req);
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving category!!" });
  }
};
const putCategory = async (req, res) => {
  try {
    const { _id, Name, Description, TotalItem } = req.body;
    const data = await updateCategoryService({
      _id,
      Name,
      Description,
      TotalItem,
    });
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
