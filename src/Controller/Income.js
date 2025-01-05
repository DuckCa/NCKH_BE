const {
  getIncomeList,
  getIncomeByIdService,
  AddIncomeService,
} = require("../Service/IncomeService");

const getIncomes = async (req, res) => {
  try {
    if (req?.query?._id) {
      const data = await getIncomeByIdService(req.query._id);
      return res.status(200).json(data);
    } else {
      const data = await getIncomeList();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Get Income" });
  }
};

const putIncome = async () => {
  try {
    const data = await getIncomeList();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error Put Income" });
  }
};
const postIncome = async (req, res) => {
  try {
    const { item, totalIncome, artistId } = req.body;
    console.log(">>>>CHECK POST INCOME:", req.body);
    const data = await AddIncomeService({ item, totalIncome, artistId });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error Post Income" });
  }
};
const deleteIncome = async (req, res) => {
  try {
    const data = await getIncomeList();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error Delete Income" });
  }
};

module.exports = {
  getIncomes,
  putIncome,
  postIncome,
  deleteIncome,
};
