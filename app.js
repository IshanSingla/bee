// Entry point of the application
require("dotenv").config();

// Mongodb connect
require("./src/configs/mongoose")();

const express = require('express');
const { getIPAddress } = require("./src/utils/getIPAddress");
const { errorHandler } = require("./src/middleware/errorHandler");


const app = express();

app
  .set("trust proxy", true)
  .disable("x-powered-by")
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./src/routes/bookRoutes"))
  .use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`
    ************************************************************
                      Listening on port: ${PORT}
                      http://localhost:${PORT}
                      http://${getIPAddress()}:${PORT}
    ************************************************************`);
});
