const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ConnectMongoose = require("./Configurations/Database");
const Item = require("./Models/Item");
const itemData = require("./Utilities/Data");

dotenv.config();
ConnectMongoose();

const ImportData = async () => {
  try {
    await Item.deleteMany();
    const items = await Item.insertMany(itemData);
    console.log("All items are Added Successfully");
    process.exit();
  } catch (error) {
    console.log("Some Error Occured in adding all the items");
    process.exit(1);
  }
};

ImportData();
