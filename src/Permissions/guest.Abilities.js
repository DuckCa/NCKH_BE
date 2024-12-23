const { AbilityBuilder } = require("@casl/ability");

function guestPermissions(can, cannot, id) {
  console.log(">>>>HELLO GUEST!!!");
  can("read", "Item"); // Xem danh sách và thông tin chi tiết của item
  can("read", "Account"); // Tìm artist
  // Xem thông tin chi tiết của Artist
  can("read", "Category"); // Xem category
}

module.exports = guestPermissions;
