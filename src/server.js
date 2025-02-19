require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
});

const { createServer } = require("node:http");
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const loginRoutes = require("./Routes/loginApi");
const roleRoutes = require("./Routes/roleApi");
const accRoutes = require("./Routes/accApi");
const itemRoutes = require("./Routes/itemApi");
const sequelize = require("./config/databaseMySQL");
const requestRouters = require("./Routes/requestApi");
const categoryRouters = require("./Routes/categoryApi");
const cartRouters = require("./Routes/cartApi");
const billRouters = require("./Routes/billApi");
const userItem = require("./Routes/userItemApi");
const Income = require("./Routes/income");
const {
  defaultDataService,
  defaultDataCountItem,
  getCategoryLists,
  getItemLists,
} = require("./Service/defaultData");

// const categoryRouters = require("./Routes/categoryApi");
const conn = require("./config/database");
const path = require("path");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const connection = require("./config/database");
app.use(
  cors({
    origin: "*", // Cho phép tất cả
  })
);
app.use(
  "/images",
  express.static(path.join(__dirname, "Public", "Items_e_commerce"))
);

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRoutes);
app.use("/", itemRoutes, categoryRouters, accRoutes);
app.use(
  "/user",
  Income,
  billRouters,
  cartRouters,
  itemRoutes,
  requestRouters,
  accRoutes
);
app.use("/user/sale", userItem, categoryRouters, itemRoutes, requestRouters); //không cần account vì cả sale và manager đều bắt đầu từ user
app.use("/user/admin", roleRoutes, requestRouters, itemRoutes, categoryRouters);

// app.use("/");
// app.use("/login", loginRoutes);
// app.use("/user/sale", itemRoutes); //không cần accrount vì cả sale và manager đều bắt đầu từ user
// // app.use("/user/manager");
// app.use("/user/admin", roleRoutes);
//const mongoose = require('mongoose');

(async () => {
  try {
    console.log("👉 Calling defaultDataCountItem()...");
    await sequelize.authenticate();
    await conn();
    await defaultDataService();
    await connection();
    await getCategoryLists();
    await getItemLists();
    await defaultDataCountItem();

    // Cập nhật số lượng item trong category mỗi 5 phút (300,000 ms)
    setInterval(async () => {
      console.log("🔄 [AUTO UPDATE] Running defaultDataCountItem()...");
      await defaultDataCountItem();
      console.log("✅ [AUTO UPDATE] Finished defaultDataCountItem()");
    }, 300000); // 5 phút

    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  } catch (error) {
    console.log(">>>>>>>>ERRO CONNECT TO DB:", error);
  }
})();
