const Item = require("../Model/Item");
const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
} = require("../Model/Index");
const Cart = require("../Model/Cart");
const Category = require("../Model/Category");
const { json } = require("express");
const mongoose = require("mongoose");
const getItemList = async (req) => {
  const data = await Item.find();

  // Sử dụng Promise.all để đợi tất cả các Promise hoàn thành
  const dataOutput = await Promise.all(
    data.map(async (item) => {
      // Xử lý artist
      const listArtist = await Promise.all(
        item.artist.map(async (_id) => {
          const artist = await Account.findOne({
            where: {
              _id: _id,
            },
          });
          return artist.username; // Trả về username của artist
        })
      );

      // Xử lý category
      const listCategory = await Promise.all(
        item.category.map(async (_id) => {
          const category = await Category.findById(_id);
          return category.Name; // Trả về Name của category
        })
      );

      // Trả về đối tượng mới với artist và category đã được thay thế
      return {
        ...item.toObject(), // Chuyển Mongoose document thành plain object
        artist: listArtist,
        category: listCategory,
      };
    })
  );

  return dataOutput;
};

const updateItemService = async (infor) => {
  const dataItem = await Item.findById(infor._id);
  let artistData;
  let categoryData;

  if (Array.isArray(infor.artist)) {
    artistData = infor.artist
      .filter((id) => id)
      .map((id) => mongoose.Types.ObjectId(id));
  } else {
    artistData = dataItem.artist;
  }

  if (Array.isArray(infor.category)) {
    categoryData = infor.category
      .filter((id) => id)
      .map((id) => mongoose.Types.ObjectId(id));
  } else {
    categoryData = dataItem.category;
  }

  let dataItemPrice = mongoose.Types.Decimal128.fromString(
    dataItem.price.toString()
  );
  let inforPrice = infor.price
    ? mongoose.Types.Decimal128.fromString(infor.price.toString())
    : dataItemPrice;

  // Xác định các category được thêm hoặc xóa
  const oldCategories = dataItem.category.map((id) => id.toString());
  const newCategories = categoryData.map((id) => id.toString());

  const removedCategories = oldCategories.filter(
    (id) => !newCategories.includes(id)
  );
  const addedCategories = newCategories.filter(
    (id) => !oldCategories.includes(id)
  );

  // Cập nhật TotalItem cho các category bị ảnh hưởng
  await Promise.all(
    removedCategories.map((id) =>
      Category.updateOne({ _id: id }, { $inc: { TotalItem: -1 } })
    )
  );

  await Promise.all(
    addedCategories.map((id) =>
      Category.updateOne({ _id: id }, { $inc: { TotalItem: 1 } })
    )
  );

  // Cập nhật thông tin sản phẩm
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
    category: JSON.parse(infor.category),
    price: infor.price,
    url: infor.url,
  });
  const listCate = JSON.parse(infor.category);
  console.log(">>>CHECK Add item:", typeof listCate);
  if (listCate) {
    listCate?.forEach(async (categories) => {
      const findCategory = await Category.findById(categories);
      const updateTotal = await Category.updateOne(
        {
          _id: findCategory._id,
        },
        {
          TotalItem: findCategory.TotalItem + 1,
        }
      );
      console.log("Category total has updated!!");
    });
  }
  return data;
};

const deleteItemService = async (_id) => {
  const Item = await Item.findById(_id);
  const data = await Item.delete({ _id: _id });
  const delMatchRole = await MatchRole.delete({ ItemId: _id });
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
