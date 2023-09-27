const { Router } = require("express");
const router = Router();
const Bill = require("../Models/Bills");

// Route 1: This is to Add a Bill / METHOD: POST
router.post("/add-bill", async (req, res) => {
  try {
    let bill = new Bill(req.body);
    await bill.save();
    res.status(200).send({
      success: true,
      message: "Bill Has Been Added Successfully",
      bill,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some Error Occured in the Server" });
  }
});

// Route 2: This is to get all the Bills / METHOD: GET
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res
      .status(200)
      .send({ success: true, message: "Bills Have Been fetched", bills });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some Error Occured in the Server" });
  }
});

module.exports = router;
