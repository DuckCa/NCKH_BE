const Item = require("../Model/Item");
const Category = require("../Model/Category");
const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");

const { json } = require("express");
const mongoose = require("mongoose");
const getCategoryList = async (req) => {
  const data = await Category.find();
  //Lấy cả số lượng tác phẩm của mỗi category

  return data;
};

const updateCategoryService = async (infor) => {
  const data = await Category.updateOne(
    { _id: infor._id },
    { Name: infor.Name, Description: infor.Description }
  );

  return data;
};

const addCategoryService = async (infor) => {
  console.log(">>>>>>>>>>>>CHECKKKKKKK ITEM INFOR:", infor);
  const data = await Category.create({
    Name: infor.Name,
    Description: infor.Description,
  });
  return data;
};

const deleteCategoryService = async (_id) => {
  const data = await Category.delete({ _id });
  return data;
};
module.exports = {
  getCategoryList,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
