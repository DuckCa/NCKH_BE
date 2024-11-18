const Item = require("../Model/Item");
const matchRole = require("../Model/MatchRole");
const Cart = require("../Model/Cart");
const { json } = require("express");
const mongoose = require("mongoose");
const getItemList = async (req) => {
  const data = await Item.find();
  return data;
};

const updateItemService = async (infor) => {
  const dataItem = await Item.findById(infor._id);
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

const addItemService = async (infor) => {
  console.log(">>>>>>>>>>>>CHECKKKKKKK ITEM INFOR:", infor);
  const data = await Item.create({
    name: infor.name,
    description: infor.description,
    artist: JSON.parse(infor.artist),
    category: infor.portfolio ? mongoose.Types.ObjectId(infor.portfolio) : null,
    price: infor.price,
    url: infor.url,
  });

  return data;
};

const deleteItemService = async (_id) => {
  const Item = await Item.findById(_id);
  const data = await Item.delete({ _id: _id });
  const delMatchRole = await matchRole.delete({ ItemId: _id });
  const delCart = await Cart.delete({ _id: Item.cart });
  console.log(`>>>>>>>>CHECK cartId: ${Item.cart}; CHECK ID ${_id}`);
  return data;
};
module.exports = {
  getItemList,
  addItemService,
  updateItemService,
  deleteItemService,
};
