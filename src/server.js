require("dotenv").config();
const { createServer } = require("node:http");
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;
const express = require("express");
const app = express();
const loginRoutes = require("./Routes/loginApi");
const roleRoutes = require("./Routes/roleApi");
const accRoutes = require("./Routes/accApi");
const conn = require("./config/database");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/");
app.use("/login", loginRoutes);
app.use("/user", accRoutes);
app.use("/user/sale"); //không cần accrount vì cả sale và manager đều bắt đầu từ user
app.use("/user/manager");
app.use("/user/admin", roleRoutes);
(async () => {
  try {
    //Connect for mongonoose
    await conn();

    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  } catch (error) {
    console.log(">>>>>>>>ERRO CONNECT TO DB:", error);
  }
})();
