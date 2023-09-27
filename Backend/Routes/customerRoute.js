const { Router } = require("express");
const router = Router();
const Customer = require("../Models/Customer");
const mongoose = require("mongoose");

// Route 1: This is to create a Customer / METHOD: POST
router.post("/add-customer", async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    let customer = new Customer({ name, phone, email, address });
    await customer.save();
    res.status(200).send({
      success: true,
      message: "Customer Has Been Added Successfully",
      customer,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some error occured in The Server" });
  }
});

// Route 2: This is to Delete a Customer / METHOD: DELETE
router.delete("/delete-customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let customer = await Customer.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Customer Has Been Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some error occured in The Server" });
  }
});

// Route 3: This is to Get All the Customer / METHOD: GET
router.get("/get-all", async (req, res) => {
  try {
    let customers = await Customer.find();
    res.status(200).send({
      success: true,
      message: "All The Customers Have Been Fetched",
      customers,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some error occured in The Server" });
  }
});

// Route 4: This is to Edit The Customer Data / METHOD: PUT
router.put("/edit-customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    let customer = await Customer.findByIdAndUpdate(
      id,
      { name, email, address, phone },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "The Customer Has Been Edited Successfully",
      customer,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some error occured in The Server" });
  }
});

module.exports = router;
