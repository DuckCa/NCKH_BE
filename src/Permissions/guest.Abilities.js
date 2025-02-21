const { AbilityBuilder } = require("@casl/ability");

function guestPermissions(can, cannot, id) {
  console.log(">>>>HELLO GUEST!!!");
  can("read", "Item"); // Xem danh sách và thông tin chi tiết của item
  can("read", "Account"); // Tìm artist
  can("update", "Account"); // Tìm artist
  can("create", "NormalAccount");
  // Xem thông tin chi tiết của Artist
  can("read", "Category");
  can("manage", "userItem");
  can("manage", "Term");
}

module.exports = guestPermissions;
