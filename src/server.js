require("dotenv").config();
const { createServer } = require("node:http");
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;
const express = require("express");
const app = express();
const loginRoutes = require("./Routes/loginApi");
const roleRoutes = require("./Routes/roleApi");
const conn = require("./config/database");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRoutes);
app.use("/role", roleRoutes);

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
