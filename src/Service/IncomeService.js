const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
  Income,
} = require("../Model/Index");
const Item = require("../Model/Item");
const mongoose = require("mongoose");
const getIncomeList = async () => {
  const data = await Income.findAll();
  const dataOutput = await Promise.all(
    data.map(async (item) => {
      // Tìm thông tin item từ bảng Item
      const findItem = await Item.findById(item.item);
      // Cập nhật thuộc tính item với tên của item
      item.item = findItem.name.toString();
      // Trả về item đã được cập nhật
      return item;
    })
  );
  return dataOutput;
};
const getIncomeByIdService = async (_id) => {
  const data = await Income.findAll({
    where: { artistId: _id },
  });
  const dataOutput = await Promise.all(
    data.map(async (item) => {
      // Tìm thông tin item từ bảng Item
      const findItem = await Item.findById(item.item);
      // Cập nhật thuộc tính item với tên của item
      item.item = findItem.name.toString();
      // Trả về item đã được cập nhật
      return item;
    })
  );
  return dataOutput;
};

const AddIncomeService = async (infor) => {
  try {
    const data = await Income.create({
      item: infor.item,
      totalIncome: infor.totalIncome,
      artistId: infor.artistId,
    });
    return data;
  } catch (error) {
    console.error("Error in AddIncomeService:", error);
    throw error; // Ném lỗi để controller bắt được
  }
};

const deleteIncomeService = async (_id) => {
  const Income = await Income.findOne({
    where: { _id: _id },
  });
  const data = await Income.destroy({ where: { _id: _id } });
  const delMatchRole = await MatchRole.destroy({ where: { IncomeId: _id } });
  console.log(">>>>>>>CHECK CART:", Income.cart);
  const delCart = await Cart.delete({
    _id: Income.cart,
    // _id: Income.cart.replace(/"/g, "") code cũ
  });

  return data;
};
module.exports = {
  getIncomeList,
  getIncomeByIdService,
  AddIncomeService,
  deleteIncomeService,
};
