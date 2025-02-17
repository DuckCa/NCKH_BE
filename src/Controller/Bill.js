const {
  getBillService,
  getBillByIdService,
  getBillByYearService,
  addBillService,
  updateBillService,
  deleteBillService,
} = require("../Service/BillService");

const getBills = async (req, res) => {
  try {
    console.log(">>>>CHECK QUERY BILL:", req?.query?._id);
    if (req?.query?._id) {
      const data = await getBillByIdService(req?.query?._id);
      return res.status(200).json(data);
    } else {
      console.log(">>>>CHECK BILL:");
      const data = await getBillService();
      return res.status(200).json(data);
    }
  } catch {
    return res.status(500).json({ message: "Error get Bill!" });
  }
};
const getBillsByYear = async (req, res) => {
  try {
    const year = req?.query?.year;
    console.log(">>>>CHECK BILL YEAR:", year);
    const data = await getBillByYearService(year);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error get Bill!" });
  }
};

const putBill = async (req, res) => {
  try {
    const { _RequestId, Name, Description } = req.body;
    const data = await updateBillService({
      _RequestId,
      Name,
      Description,
    });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error put Bill!" });
  }
};
const postBill = async (req, res) => {
  try {
    const { cartId, paymentMethod, status, totalAmount } = req.body;

    const data = await addBillService({
      cartId,
      paymentMethod,
      status,
      totalAmount,
    });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error post Bill!" });
  }
};
const deleteBill = async (req, res) => {
  try {
    const { _RequestId } = req.body;
    const data = await deleteBillService(_RequestId);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Error delete Bill!" });
  }
};
module.exports = {
  getBills,
  getBillsByYear,
  putBill,
  postBill,
  deleteBill,
};
