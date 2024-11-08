const Role = require("../Model/Role");
const matchRole = require("../Model/MatchRole");

const getRoleList = async (req) => {
  const data = await Role.find(); // Sử dụng await
  return data;
};
const getMatchRoleList = async (req) => {
  const data = await matchRole.find(); // Sử dụng await
  return data;
};

const addRoleService = async (roleName, roleDescription) => {
  const data = await Role.create({ roleName, roleDescription }); // Sử dụng await
  return data;
};

const updateRoleService = async (roleName, roleDescription, newName) => {
  const data = await Role.updateOne(
    { roleName: roleName },
    { roleName: newName, roleDescription: roleDescription }
  );
  return data;
};

const deleteRoleService = async (roleName) => {
  const data = await Role.delete({ roleName: roleName });
  return data;
};

module.exports = {
  getRoleList,
  getMatchRoleList,
  addRoleService,
  updateRoleService,
  deleteRoleService,
};
