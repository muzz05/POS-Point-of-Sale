const { Router } = require("express");
const router = Router();
const Item = require("../Models/Item");

// Route 1: This is to Get all the items  / METHOD: GET
router.get("/get-items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send({
      success: true,
      message: "Items have been fetched Successfully",
      items,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Some Error Occured in the Fetching All the Items",
    });
  }
});

// Route 2: This is to Add an Item  / METHOD: POST
router.post("/add-item", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send({
      success: true,
      message: "The Item has been added Successfully",
      newItem,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Some Error Occured in Adding The Item",
    });
  }
});

// Route 3: This is to edit Item / METHOD: PUT
router.put("/edit-item", async (req, res) => {
  try {
    const { category, name, image, price } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.body._id,
      { category, name, image, price: Number(price) },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "Item has been Edit Successfully",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Some Error Occured in Adding The Item",
    });
  }
});

//Route 4: This is to delete Item ? METHOD: DELETE
router.delete("/delete-item/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "Item has been Deleted Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Some Error Occured in Adding The Item",
    });
  }
});

module.exports = router;
