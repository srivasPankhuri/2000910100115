// routes/companyRoutes.js
const express = require("express");
const companyController = require("../controllers/companyControllers");
const authController = require("../controllers/auth");

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

// Route to obtain Authorization Token
router.post("/auth", async (req, res) => {
  try {
    const authData = req.body;
    console.log(authData);

    // Validate the required fields in the request
    if (!authData.companyName || !authData.clientID || !authData.clientSecret) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the company is registered with the provided details
    const registration = await authController.getRegistration(authData);

    console.log(registration);

    if (!registration) {
      // console.log(error);
      return res.status(400).json({ error: "Company not registered." });
    }

    const accessToken = authController.generateAccessToken(registration);

    // Send the response with the authorization token
    res.status(200).json({
      token_type: "Bearer",
      access_token: accessToken,
      expires_in: 7200, // 2 hours in seconds
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to obtain Authorization Token." });
  }
});

module.exports = router;
