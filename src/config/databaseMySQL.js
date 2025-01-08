require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
});

const { Sequelize } = require("sequelize");

// Khởi tạo Sequelize với cấu hình đúng
const sequelize = new Sequelize(
  process.env.DB_database_MySQL,
  process.env.DB_MYSQL_USER,
  process.env.DB_MYSQL_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: "mysql",
    logging: console.log, // Log mọi truy vấn
  }
);

console.log(">>>>>>>>>CHECK PASSWORD:", process.env.DB_PASSWORD);
console.log(">>>>>>>>>CHECK Node_Mode:", process.env.NODE_ENV);
console.log(">>>>>>>>>CHECK Connect:", sequelize.config);
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
