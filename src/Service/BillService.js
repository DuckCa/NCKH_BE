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
  const data = await Bill.findAll();

  // Sử dụng Promise.all để đợi tất cả các promise hoàn thành
  const updatedData = await Promise.all(
    data.map(async (item) => {
      const mapItem = await Cart.findById(item.cartId);
      return {
        ...item.toJSON(), // Chuyển đổi Sequelize instance thành plain object (nếu cần)
        productList: mapItem.item, // Thay thế cartId bằng danh sách sản phẩm
      };
    })
  );

  return updatedData; // Trả về mảng đã được cập nhật
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
const addBillService = async (infor) => {
  try {
    const data = await Bill.create({
      cartId: infor.cartId,
      paymentMethod: infor.paymentMethod,
      status: infor.status,
      totalAmount: infor.totalAmount,
    });

    if (data?.dataValues?.cartId) {
      const findCart = await Cart.findById(data?.dataValues?.cartId);
      console.log(">>>CHECK Cart for Bill:", findCart);
      findCart?.item?.forEach(async (item) => {
        const accountItem = await UserItem.create({
          type: 0,
          userId: infor.userId,
          item: item.toString(),
        });
      });
    }
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
  addBillService,
  updateBillService,
  deleteBillService,
};
