// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const { Resend } = require("resend");

// Load environment variables from .env file
require("dotenv").config();

// Create an express app
const app = express();

// Add middleware to parse form body
app.use(bodyParser.urlencoded({ extended: false }));

// Use Resend email API with key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Create a post endpoint for contact form
app.post("/contact", async (req, res) => {
  // Extract the email, subject and message from form body
  const { email, subject, message } = req.body;

  // Use Resend to send an email
  await resend.emails.send({
    from: "demo@blair.nz",
    to: "james@blair.nz",
    subject: `${email} sent a message | ${subject}`,
    text: message,
  });

  // Redirect to the success page
  res.redirect("http://127.0.0.1:3000/ok");
});

// Make express app listen on port 8080
app.listen(8080, () => {
  console.log("now listening on port 8080");
});
