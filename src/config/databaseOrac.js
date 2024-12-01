require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
});

const { Sequelize } = require("sequelize");

// Khởi tạo Sequelize với cấu hình đúng
const sequelize = new Sequelize(
  process.env.DB_Oracle_SID,
  process.env.DB_USER_Oracle,
  process.env.DB_PASSWORD_Oracle,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_Oracle_PORT,
    dialect: "oracle",
  }
);

console.log(">>>>>>>>>CHECK PASSWORD:", process.env.DB_PASSWORD_Oracle);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection is successful.");
  } catch (error) {
    console.error(">>>>>ERROR CONNECTION:", error);
  }
};

connectToDatabase();

module.exports = sequelize;
