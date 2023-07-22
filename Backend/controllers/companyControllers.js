const mongoose = require("mongoose");
const Registration = require("../models/companySchema");

function generateClientSecret() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let clientSecret = "";
  for (let i = 0; i < 16; i++) {
    clientSecret += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return clientSecret;
}

async function registerCompany(req, res) {
  const registrationData = req.body;

  try {
    // Check if the same company has already registered
    const existingRegistration = await Registration.findOne({
      companyName: registrationData.companyName,
      ownerEmail: registrationData.ownerEmail,
    });

    if (existingRegistration) {
      return res.status(400).json({ error: "Company already registered." });
    }

    // Generate the clientSecret
    const clientSecret = generateClientSecret();

    // Save registration data to the database along with the generated clientSecret
    const newRegistration = new Registration({
      _id: new mongoose.Types.ObjectId(),
      ...registrationData,
      clientSecret,
    });
    await newRegistration.save();

    // Send the response with companyName and clientID in JSON format
    res.status(200).json({
      companyName: newRegistration.companyName,
      clientID: newRegistration._id,
      clientSecret: newRegistration.clientSecret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register the company." });
  }
}

module.exports = {
  registerCompany,
};
