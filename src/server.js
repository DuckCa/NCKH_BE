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
const sequelize = require("./config/databaseOrac");
const requestRouters = require("./Routes/requestApi");
const categoryRouters = require("./Routes/categoryApi");
const { defaultDataService } = require("./Service/defaultData");
// const categoryRouters = require("./Routes/categoryApi");
const conn = require("./config/database");
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRoutes);
app.use("/", itemRoutes, categoryRouters, accRoutes);
app.use("/user", itemRoutes, requestRouters, accRoutes);
app.use("/user/sale", categoryRouters, itemRoutes, requestRouters); //không cần account vì cả sale và manager đều bắt đầu từ user
app.use("/user/admin", roleRoutes, requestRouters, itemRoutes, categoryRouters);

// app.use("/");
// app.use("/login", loginRoutes);
// app.use("/user/sale", itemRoutes); //không cần accrount vì cả sale và manager đều bắt đầu từ user
// // app.use("/user/manager");
// app.use("/user/admin", roleRoutes);

(async () => {
  try {
    //Connect for mongonoose
    await sequelize.authenticate();
    await conn();
    console.log(typeof defaultDataService);
    await defaultDataService();

    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  } catch (error) {
    console.log(">>>>>>>>ERRO CONNECT TO DB:", error);
  }
})();
