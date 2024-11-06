const Account = require("../Model/Account");
const matchRole = require("../Model/MatchRole");
const Cart = require("../Model/Cart");
const { default: mongoose } = require("mongoose");
const getAccountList = async (req) => {
  const data = await Account.find(); // Sử dụng await
  return data;
};

const updateAccountService = async (infor) => {
  if (infor.wishlist) {
    const data = await Account.updateOne(
      { _id: infor._id },
      { wishlist: infor.wishlist }
    );
    return data;
  } else {
    const data = await Account.updateOne(
      { _id: infor._id },
      {
        userName: infor.userName,
        email: infor.email,
        password: infor.password,
        bio: infor.bio,
        portfolio: infor.portfolio
          ? mongoose.Types.ObjectId(infor.portfolio)
          : null,
      }
    );
    return data;
  }
};
//Function dành cho admin để tạo các account đặc biệt
const addAccountService = async (userName, email, password, bio, roleId) => {
  const cart = await Cart.create({});
  const existingCart = await Cart.findById(cart._id);
  if (!existingCart) {
    console.log("CART WAS NOT CREATED!!!!!");
    return Error("Cart was not created successfully.");
  } else {
    console.log("CART CREATED SUCCESS!!!!!");
  }
  const data = await Account.create({
    userName,
    email,
    password,
    cart: cart._id,
    bio,
  });
  const matchrole = await matchRole.create({
    accountId: data._id,
    roleId: roleId,
  });

  return `${JSON.stringify(data)}\n${JSON.stringify(
    matchrole
  )}\n${JSON.stringify(cart)}`;
};

const deleteAccountService = async (_id) => {
  const account = await Account.findById(_id);
  const data = await Account.deleteOne({ _id: _id });
  const delMatchRole = await matchRole.deleteOne({ accountId: _id });
  const delCart = await Cart.deleteOne({ _id: account.cart });
  console.log(`>>>>>>>>CHECK cartId: ${account.cart}; CHECK ID ${_id}`);
  return data;
};
module.exports = {
  getAccountList,
  addAccountService,
  updateAccountService,
  deleteAccountService,
};
