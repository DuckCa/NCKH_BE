const mongoose = require("mongoose");
const {
  sequelize,
  Account,
  Role,
  MatchRole,
  UserItem,
  RequestHistory,
  Bill,
} = require("../Model/Index");
const Cart = require("../Model/Cart");
const getBillService = async () => {
  try {
    const data = await Bill.findAll();
    const updatedData = await Promise.all(
      data.map(async (item) => {
        const objectId = new mongoose.Types.ObjectId(item.cartId);

        const mapItem = await Cart.findById(objectId);

        if (!mapItem) {
          return {
            ...item.toJSON(),
            productList: [],
          };
        }

        return {
          ...item.toJSON(),
          productList: mapItem.item,
        };
      })
    );

    return updatedData;
  } catch (error) {
    console.error("Error in getBillService:", error);
    throw error; // Ném lỗi để controller xử lý
  }
};
const getBillByIdService = async (_id) => {
  try {
    // Tìm account
    const findAccount = await Account.findByPk(_id);
    if (!findAccount) {
      throw new Error("Account not found");
    }
    const cartIdCorrect = findAccount.dataValues.cart;
    //  const cartIdCorrect = findAccount.dataValues.cart.replace(/"/g, "");
    if (!cartIdCorrect) {
      throw new Error("Cart ID not found in Account");
    }
    // Tìm cart
    const findCart = await Cart.findById(cartIdCorrect);
    if (!findCart) {
      throw new Error("Cart not found");
    }
    console.log(">>>>CHECK CART ID:", findAccount.dataValues.cart);
    // Tìm các bill liên quan đến cart
    const data = await Bill.findAll({
      where: { cartId: cartIdCorrect.toString() },
    });
    if (data.length === 0) {
      console.log("No bills found for this cart");
      return data;
    } else {
      // Thay thế cartId bằng danh sách sản phẩm
      const updatedData = await Promise.all(
        data.map(async (item) => {
          const mapItem = await Cart.findById(item.cartId);
          if (!mapItem) {
            throw new Error(`Cart not found for bill with ID: ${item._id}`);
          }
          return {
            ...item.toJSON(),
            productList: mapItem.item,
          };
        })
      );

      return updatedData;
    }
  } catch (error) {
    console.error("Error in getBillByIdService:", error);
    throw error;
  }
};
const getBillByYearService = async (year) => {
  try {
    // Lấy tất cả các hóa đơn
    const data = await Bill.findAll();

    // Lọc các hóa đơn theo năm
    const filteredData = data.filter((item) => {
      const createdAtYear = new Date(item.createdAt).getFullYear();
      return createdAtYear == year;
    });
    console.log(">>>>CHECK YEAR:", filteredData);
    // Cập nhật thông tin sản phẩm cho từng hóa đơn
    const updatedData = await Promise.all(
      filteredData.map(async (item) => {
        const objectId = new mongoose.Types.ObjectId(item.cartId);

        const mapItem = await Cart.findById(objectId);

        if (!mapItem) {
          return {
            ...item.toJSON(),
            productList: [],
          };
        }

        return {
          ...item.toJSON(),
          productList: mapItem.item,
        };
      })
    );

    return updatedData;
  } catch (error) {
    console.error("Error in getBillByYearService:", error);
    throw error; // Ném lỗi để controller xử lý
  }
};

const addBillService = async (infor) => {
  try {
    const data = await Bill.create({
      cartId: infor.cartId,
      paymentMethod: infor.paymentMethod,
      status: infor.status,
      totalAmount: infor.totalAmount,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
const updateBillService = async (infor) => {};

const deleteBillService = async (_id) => {};

module.exports = {
  getBillService,
  getBillByIdService,
  getBillByYearService,
  addBillService,
  updateBillService,
  deleteBillService,
};
