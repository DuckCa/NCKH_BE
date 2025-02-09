const artistPermissions = require("./artists.Abilities");

function adminPermissions(can,cannot, user) {
  // Inherit artist permissions
  artistPermissions(can, user);

  // Add Admin-specific permissions
  can("manage", "Category");
  can("manage", "Account"); // CRUD Account
  can("manage", "Role"); // CRUD Role
  can("manage", "Item"); // CRUD Item
  can("read", "Request");
  can("manage", "Request");
}

module.exports = adminPermissions;
