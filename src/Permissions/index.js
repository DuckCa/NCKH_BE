const { AbilityBuilder, Ability } = require("@casl/ability");
const guestPermissions = require("./guest.Abilities");
const normalUserPermissions = require("./normalUser.Abilities");
const artistPermissions = require("./artists.Abilities");
const adminPermissions = require("./admin.Abilities");

function defineAbilitiesFor(user, id) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  console.log(">>>>>>>CHECK ROLEss FOR AUTHOR:", typeof user?.userRole);
  const role = user?.userRole?.[0] || 4;
  console.log(">>>>>>>CHECK ROLE FOR AUTHOR:", role);
  switch (role) {
    case 1:
      adminPermissions(can, cannot, user);
      break;
    case 2:
      artistPermissions(can, cannot, user);
      break;
    case 3:
      normalUserPermissions(can, cannot, user);
      break;
    case 4:
      guestPermissions(can, cannot, id);
      break;
    default:
      throw new Error(`Unknown role: ${role}`);
  }

  return build();
}
//sau này có chức năng cấp quyền cho role có thể dùng loop để tạo thêm case và cấp quyền riêng.
module.exports = { defineAbilitiesFor };
