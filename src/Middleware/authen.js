require("dotenv").config();
const jwt = require("jsonwebtoken");
const authen = (req, res, next) => {
  const white_list = ["Acc", "Account", "category", "item", "images", "Artist"];
  console.log(">>>>>>>>CHECK URL:", req.originalUrl.split("?")[0]);
  if (white_list.find((item) => "/" + item === req.originalUrl.split("?")[0])) {
    console.log(">>CHECK NEXT!!");
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1]; //chia data thành mảng được tách bởi " " và lấy giá trị thứ "1"
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          _id: decoded._id,
          email: decoded.email,
          username: decoded.username,
          userRole: decoded.userRole,
        };

        next();
      } catch (error) {
        console.error(error);
        return res.status(401).json({
          message: "Token out of date or not correct",
        });
      }
    } else {
      return res.status(401).json({
        message:
          "You hadn't sent access_token or your access_token had been expired!!!",
      });
    }
  }
};

module.exports = authen;
