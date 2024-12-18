const {
  getRoleList,
  getMatchRoleList,
  addRoleService,
  updateRoleService,
  deleteRoleService,
} = require("../Service/roleService");

const getRoles = async (req, res) => {
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

const putRole = async (req, res) => {
  try {
    const { roleName, roleDescription, newName } = req.body;
    const data = await updateRoleService(roleName, roleDescription, newName);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating role" });
  }
};

const postRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;
    const data = await addRoleService(roleName, roleDescription);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteRoleService(_id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting role" });
  }
};

module.exports = { getRoles, getMatchRoles, putRole, postRole, deleteRole };
