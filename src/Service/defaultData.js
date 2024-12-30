const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");
const Cart = require("../Model/Cart");
const mongoose = require("mongoose");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { getMatchRoleList } = require("./roleService");
const getAccountList = async (req) => {
  const data = await Account.findAll();
  return data;
};
//Function dành cho admin để tạo các account đặc biệt
const defaultDataService = async () => {
  const dataRole = [
    {
      roleName: "Admin",
      roleDescription:
        "A person can see Revenue, provide special account, create new role and many more.",
    },
    {
      roleName: "Artist",
      roleDescription:
        "A person can post art and sell it, make a request to send his/her art to selling on Auction.",
    },
    {
      roleName: "Normal User",
      roleDescription:
        "A person can watch, search art and buy it, normal user can make a request to become an artist.",
    },
  ];
  const passwordDecoded = await bcrypt.hash("123", saltRounds);
  let dataAccount1 = {
    username: "Nguyen Hai Hoai Duc",
    email: "fizzducnguyen@gmail.com",
    password: passwordDecoded,
    cart: null,
    bio: "A handsome admin",
  };
  let dataAccount2 = {
    username: "Tran Trung Nghia",
    email: "trungnghia@gmail.com",
    password: passwordDecoded,
    cart: null,
    bio: "A good artist",
  };
  let dataAccount3 = {
    username: "Nguyen Viet Hoa",
    email: "viethoa@gmail.com",
    password: passwordDecoded,
    cart: null,
    bio: "A normal user",
  };

  const checkRole = await Role.findAll();
  //   const cart = await Cart.create({});

  if (!checkRole || checkRole.length === 0) {
    console.log("Role is Empty!!!!!", checkRole);
    const data = await Role.bulkCreate(dataRole);
  } else {
    console.log("Role is NOT Empty!!!!!", checkRole);
  }
  const checkAccount = await Account.findAll();
  if (!checkAccount || checkAccount.length === 0) {
    const cart = await Cart.insertMany([{}, {}, {}]);
    console.log("CHECK CART", cart);
    let count = 0;

    for (const carts of cart) {
      let datadefault = {};
      const getAdmintId = await Role.findOne({ where: { roleName: "Admin" } });
      console.log(">>>>CHECK ROLEADMIN ID:", getAdmintId._id);
      const getArtistId = await Role.findOne({ where: { roleName: "Artist" } });
      console.log(">>>>CHECK ROLEARTIST ID:", getArtistId._id);
      const getNormalUserId = await Role.findOne({
        where: { roleName: "Normal User" },
      });
      console.log(">>>>CHECK ROLENORMALUSER ID:", getNormalUserId._id);
      let roleId = null;
      switch (count) {
        case 0:
          roleId = getAdmintId._id;
          dataAccount1.cart = carts._id.toString();
          datadefault = dataAccount1;
          break;
        case 1:
          roleId = getArtistId._id;
          dataAccount2.cart = carts._id.toString();
          datadefault = dataAccount2;
          break;
        case 2:
          roleId = getNormalUserId._id;
          dataAccount3.cart = carts._id.toString();
          datadefault = dataAccount3;
          break;
        default:
          console.log("Out Of Switch Case!!!");
      }

      console.log(">>>>>>>>>>>>>>>>CHECK DATA DEFAULT:", datadefault);

      const data = await Account.create(datadefault);

      const accountItem = await UserItem.create({
        type: "false",
        userId: data._id,
      });
      console.log(">>>>>>>>>>>CHECK ROLE ID:", roleId);
      const matchrole = await MatchRole.create({
        accountId: data._id,
        roleId: roleId,
      });
      count += 1;
    }
  } else {
    console.log("Account is NOT Empty!!!!!", checkAccount);
  }
};

module.exports = {
  defaultDataService,
};
