// routes/companyRoutes.js
const express = require("express");
const companyController = require("../controllers/companyControllers");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const registrationData = req.body;
    const newRegistration = await companyController.registerCompany(req, res);
    res.status(200).json(newRegistration);
  } catch (error) {
    if (error.message === "Company already registered.") {
      res.status(400).json({ error: "Company already registered." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
