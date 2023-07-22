const Registration = require("../models/companySchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getRegistration(authData) {
  // Find the company registration with the provided details
  const registration = await Registration.findOne({
    companyName: authData.companyName,
    clientID: authData.clientID,
    ownerName: authData.ownerName,
    ownerEmail: authData.ownerEmail,
    rollNo: authData.rollNo,
    clientSecret: authData.clientSecret,
  });

  return registration;
}

function generateAccessToken(registration) {
  const payload = {
    companyName: registration.companyName,
    clientID: registration.clientID,
    expires: Math.floor(Date.now() / 1000) + 7200,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7200s",
  });

  return accessToken;
}

module.exports = {
  getRegistration,
  generateAccessToken,
};
