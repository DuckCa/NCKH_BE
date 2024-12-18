const {
  getCategoryList,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../Service/CategoryService");

const getCategory = async (req, res) => {
  try {
    const data = await getRoleList(req);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving roles" });
  }
};
const getMatchRoles = async (req, res) => {
  try {
    const data = await getMatchRoleList(req);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving roles" });
  }
};

const putCategory = async (req, res) => {
  try {
    const { Name, Description } = req.body;
    const data = await updateRoleService(Name, Description);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating role" });
  }
};

const postCategory = async (req, res) => {
  try {
    const { Name, Description } = req.body;
    const data = await addRoleService(Name, Description);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding role" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteRoleService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting role" });
  }
};

module.exports = { getCategory, putCategory, postCategory, deleteCategory };
