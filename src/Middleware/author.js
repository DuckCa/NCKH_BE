const { defineAbilitiesFor } = require("../Permissions/index");
const author = (action, subject) => {
  return (req, res, next) => {
    const user = req.user; // Middleware authenticate gắn user vào req
    console.log(">>>>>>>>>>CHECK REq.query.id AUTHOR:", req.query.id);

    const ability = defineAbilitiesFor(user, req.query.id);

    console.log(">>>>>>>>>CHECK SUBJECT:", subject);
    if (ability.can(action, subject)) {
      next(); // Người dùng có quyền, tiếp tục xử lý
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  };
};

module.exports = author;
