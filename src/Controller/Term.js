const {
  getTermByIdService,
  addTermService,
  updateTermByIdService,
  deleteTermByIdService,
} = require("../Service/TermService");

const mongoose = require("mongoose");
const getTerms = async (req, res) => {
  try {
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Term" });
  }
};
const putTerm = async (req, res) => {
  try {
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Term" });
  }
};

const postTerm = async (req, res) => {
  try {
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Term" });
  }
};

const deleteTerm = async (req, res) => {
  try {
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving Term" });
  }
};

module.exports = {
  getTerms,
  putTerm,
  postTerm,
  deleteTerm,
};
