require("dotenv").config();
const { createServer } = require("node:http");
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const loginRoutes = require("./Routes/loginApi");
const roleRoutes = require("./Routes/roleApi");
const accRoutes = require("./Routes/accApi");
const itemRoutes = require("./Routes/itemApi");
<<<<<<< HEAD
const requestRouters = require("./Routes/requestApi");
=======
const sequelize = require("./config/databaseOrac");
>>>>>>> 43c4001fb9999f5fc499d9f9211de2acbbee2dee
const conn = require("./config/database");
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
// app.use("/",);
app.use("/login", loginRoutes);
app.use("/user", accRoutes);
app.use("/user/sale", itemRoutes,requestRouters);//không cần account vì cả sale và manager đều bắt đầu từ user
// app.use("/user/manager");
app.use("/user/admin", roleRoutes);
=======
// app.use("/");
// app.use("/login", loginRoutes);
app.use("/user", accRoutes);
// app.use("/user/sale", itemRoutes); //không cần accrount vì cả sale và manager đều bắt đầu từ user
// // app.use("/user/manager");
// app.use("/user/admin", roleRoutes);
>>>>>>> 43c4001fb9999f5fc499d9f9211de2acbbee2dee

(async () => {
  try {
    //Connect for mongonoose
    await sequelize.authenticate();
    await conn();
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  } catch (error) {
    console.log(">>>>>>>>ERRO CONNECT TO DB:", error);
  }
})();
