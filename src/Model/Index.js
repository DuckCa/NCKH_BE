const sequelize = require("../config/databaseOrac");
const Account = require("./Account");
const Role = require("./Role");
const MatchRole = require("./MatchRole");
const UserItem = require("./UserItem");
const RequestHistory = require("./RequestHistory");
const RequestType = require("./RequestType");
Account.belongsToMany(Role, {
  through: MatchRole,
  foreignKey: "accountId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Role.belongsToMany(Account, {
  through: MatchRole,
  foreignKey: "roleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Account.belongsToMany(RequestType, {
  through: RequestHistory,
  foreignKey: "_UserId",
});
RequestType.belongsToMany(Account, {
  through: RequestHistory,
  foreignKey: "_RequestId",
});
Account.hasOne(UserItem, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
  RequestType,
};
