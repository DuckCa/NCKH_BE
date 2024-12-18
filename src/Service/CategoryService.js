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
const Category = require("../Model/Cateogory");
const { json } = require("express");
const mongoose = require("mongoose");
const getCategoryList = async (req) => {
  const data = await Category.find();
  //Lấy cả số lượng tác phẩm của mỗi category
  return data;
};

const updateCategoryService = async (infor) => {
  const dataItem = await Category.findById(infor._id);
  let artistData;
  let categoryData;

  if (Array.isArray(infor.artist)) {
    artistData = infor.artist
      .filter((id) => id) // Loại bỏ các giá trị rỗng hoặc `null`
      .map((id) => mongoose.Types.ObjectId(id)); // Chuyển đổi các giá trị hợp lệ thành `ObjectId`
    categoryData = infor.artist
      .filter((id) => id)
      .map((id) => mongoose.Types.ObjectId(id));
  } else {
    artistData = dataItem.artist; // Nếu không có artist mới, giữ nguyên dữ liệu cũ
    categoryData = dataItem.category;
  }

  let dataItemPrice = mongoose.Types.Decimal128.fromString(
    dataItem.price.toString()
  );
  let inforPrice = infor.price
    ? mongoose.Types.Decimal128.fromString(infor.price.toString())
    : dataItemPrice;
  const data = await Item.updateOne(
    { _id: infor._id },
    {
      name: infor.name ?? dataItem.name,
      description: infor.description ?? dataItem.description,
      artist: artistData,
      category: categoryData,
      price: inforPrice,
      state: infor.state ?? dataItem.state,
      url: infor.url ?? dataItem.url,
    }
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
  const data = await Category.findById(_id);
  return data;
};
module.exports = {
  getCategoryList,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
