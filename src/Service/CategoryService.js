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
const getCategoryList = async () => {
  try {
    const data = await Category.find();
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error retrieving category!!" };
  }
};
const getCategoryById = async (_id) => {
  try {
    const data = await Category.findById(_id);
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error retrieving category!!" };
  }
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
  getCategoryById,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
