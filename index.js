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

// Serve static files
app.use(express.static("public"));

// Use Resend email API with key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Create a post endpoint for contact form
app.post("/contact", async (req, res) => {
  // Extract the email, subject and message from form body
  const { email, subject, message } = req.body;

  // TODO: Add email, subject and message validation

  // Use Resend to send an email
  await resend.emails.send({
    from: "demo@blair.nz",
    to: "james@blair.nz",
    subject: `${email} sent a message | ${subject}`,
    text: message,
  });

  // Redirect to the success page
  res.redirect("/success.html");
});

// Make express app listen on port 3000
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
