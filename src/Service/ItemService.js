const Item = require("../Model/Item");
const matchRole = require("../Model/MatchRole");
const Cart = require("../Model/Cart");
const { json } = require("express");
const getItemList = async (req) => {
  const data = await Item.find();
  return data;
};

const updateItemService = async (infor) => {
  const data = await Item.updateOne(
    { _id: infor._id },
    {
      name: infor.name,
      description: infor.description,
      artist: infor.artist,
      category: infor.category,
      price: infor.price,
      state: infor.state,
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
