const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");
const Cart = require("../Model/Cart");
const { default: mongoose } = require("mongoose");
const getAccountList = async (req) => {
  const data = await Account.findAll();
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
const addAccountService = async (
  username,
  email,
  password,
  bio,
  roleId,
  userItem
) => {
  const cart = await Cart.create({});
  const existingCart = await Cart.findById(cart._id);

  if (!existingCart) {
    console.log("CART WAS NOT CREATED!!!!!");

    return Error("Cart was not created successfully.");
  } else {
    console.log("CART CREATED SUCCESS!!!!!");
    console.log(">>>>>CHECK CART:", existingCart);
  }
  console.log(
    `>>>>>>CHECK Before ACCOUNT: USERNAME: ${username}, EMAIL: ${email}, PASSWORD: ${password}, CARTID: ${cart}, BIO: ${bio} `
  );
  const data = await Account.create({
    username: username,
    email: email,
    password: password,
    cart: JSON.stringify(cart._id),
    bio: bio,
  });

  const inputstring = userItem === "true";
  const accountItem = await UserItem.create({
    type: inputstring,
    userId: data._id,
  });

  console.log(
    `>>>>>>CHECK BEFORE MATCHTROLE, ACCOUNTID: ${data._id}, ROLEID: ${roleId}`
  );
  const matchrole = await MatchRole.create({
    accountId: data._id,
    roleId: roleId,
  });

  return `${JSON.stringify(data)}\n${JSON.stringify(
    matchrole
  )}\n${JSON.stringify(cart)}`;
};

const deleteAccountService = async (_id) => {
  const account = await Account.findById(_id);
  const data = await Account.delete({ _id: _id });
  const delMatchRole = await MatchRole.delete({ accountId: _id });
  const delCart = await Cart.delete({ _id: account.cart });
  console.log(`>>>>>>>>CHECK cartId: ${account.cart}; CHECK ID ${_id}`);
  return data;
};
module.exports = {
  getAccountList,
  addAccountService,
  updateAccountService,
  deleteAccountService,
};
