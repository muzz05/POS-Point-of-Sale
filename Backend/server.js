const express = require("express");
const morgan = require("morgan");
const ConnectMongoose = require("./Configurations/Database");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Configurations
dotenv.config();
ConnectMongoose();

const Port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/api/items", require("./Routes/itemRoute"));
app.use("/api/user", require("./Routes/userRoute"));
app.use("/api/bill", require("./Routes/billRoute"));
app.use("/api/customer", require("./Routes/customerRoute"));

// This is to listen The Application Backend
app.listen(Port, () => {
  console.log(`Server is connected to http://localhost:${Port}`);
});
