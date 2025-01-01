const normalUserPermissions = require("./normalUser.Abilities");

function artistPermissions(can, cannot, user) {
  // Inherit normalUser permissions
  normalUserPermissions(can, user);

  // Add Artist-specific permissions
  can("manage", "Item"); // CRUD và bán item
  can("create", "Request"); // Nhận request được thuê vẽ theo yêu cầu
  can("create", "Category", { type: "CreateCategory" });
  can("manage", "userItem");
}

module.exports = artistPermissions;
