// import mongoose from 'mongoose';
// const { Schema } = mongoose;
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
  const Category = require("../Model/Category");
  const Item = require("../Model/Item");
  const getAccountList = async (req) => {
    const data = await Account.findAll();
    
  };

  const getCategoryLists = async () => {
    const CategoryList = await Category.find({}, '_id');
    console.log("✅ [INFO] getCategoryLists() - Category List:", CategoryList);
    return CategoryList; // Trả về danh sách category
  };

  const getItemLists = async () => {
  const ItemCatList = await Item.find({}, 'category');
  console.log("✅ [INFO] getItemLists() - Item List:", ItemCatList);
  return ItemCatList; // Trả về danh sách item.category
};

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
      coin: 999999999,
    };
    let dataAccount2 = {
      username: "Tran Trung Nghia",
      email: "trungnghia@gmail.com",
      password: passwordDecoded,
      cart: null,
      bio: "A good artist",
      coin: 999999999,
    };
    let dataAccount3 = {
      username: "Nguyen Viet Hoa",
      email: "viethoa@gmail.com",
      password: passwordDecoded,
      cart: null,
      bio: "A normal user",
      coin: 999999999,
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

    const defaultDataCountItem = async () => {
      console.log("⏳ [START] Running defaultDataCountItem()...");
      
      try {
          const categoryList = await getCategoryLists();
          const itemList = await getItemLists();

          console.log("Danh sách Category:", categoryList);
          console.log("Danh sách Item:", itemList);

          let categoryCountMap = new Map();

        // 4️⃣ Duyệt từng Item và tăng số lượng category._id tương ứng
        itemList.forEach(Item => {
          if (Item.category && Item.category.length > 0) {
            Item.category.forEach(catId => {  
              categoryCountMap.set(catId.toString(), (categoryCountMap.get(catId.toString()) || 0) + 1);
            });
          }
        });
        

        console.log("📊 Số lượng Item trong từng Category:", categoryCountMap);

        // 5️⃣ Cập nhật lại TotalItem cho từng Category
        for (let Category of categoryList) {
          const count = categoryCountMap.get(Category._id.toString()) || 0;

          console.log(`🔄 Cập nhật CategoryId: ${Category._id} với TotalItem: ${count}`);

          const updateCate = await Category.updateOne({ _id: Category._id }, { $set: { TotalItem: count } });
          console.log(updateCate);
        }
      } catch (error) {
          console.error("❌ Lỗi khi chạy defaultDataCountItem:", error);
      }

      console.log("⏳ [END] Finished defaultDataCountItem()...");
    };

  module.exports = {
    getCategoryLists,
    getItemLists,
    defaultDataService,
    defaultDataCountItem
  };
