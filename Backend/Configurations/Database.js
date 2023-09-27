const mongoose = require("mongoose");

const ConnectMongoose = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/POS")
    .then(() => {
      console.log("Connected to Database...");
    })
    .catch((e) => {
      console.log("Some Error Occured in connecting to the Database...");
    });
};

module.exports = ConnectMongoose;
