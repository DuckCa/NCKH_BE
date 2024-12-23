const guestPermissions = require("./guest.Abilities");

function normalUserPermissions(can, cannot, user) {
  // Inherit guest permissions
  guestPermissions(can);
  console.log(">>>>>>>>>>CHECK NORMAL USER PERMISSION!!");
  // Add NormalUser-specific permissions
  can("purchase", "Item"); // Mua item
  can("create", "Request", { _id: user._id });
  can("delete", "Request", { _id: user._id });
  can("update", "Account", { _id: user._id });
}

module.exports = normalUserPermissions;
