const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

// post middleware
FileSchema.post("save", async (doc) => {
  try {
    console.log("Inside Post Save =>>");
    let transaporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail

    let info = await transaporter.sendMail({
      from: `Avinash ImageUploaderApp`,
      to: doc.email,
      subject: "New Image uploaded on Cloudinary",
      html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Template</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          margin: 0;
                          padding: 20px;
                      }
                      .container {
                          max-width: 600px;
                          margin: auto;
                          background: #ffffff;
                          padding: 20px;
                          border-radius: 8px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                          text-align: center;
                          margin-bottom: 20px;
                      }
                      .header h2 {
                          margin: 0;
                          color: #333333;
                      }
                      .content {
                          margin-bottom: 20px;
                      }
                      .content p {
                          margin: 0 0 10px;
                          color: #555555;
                      }
                      .image-container {
                          text-align: center;
                          margin-bottom: 20px;
                      }
                      .image-container img {
                          max-width: 100%;
                          border-radius: 8px;
                      }
                      .link {
                          text-align: center;
                          margin-top: 20px;
                      }
                      .link a {
                          background-color: #007BFF;
                          color: #ffffff;
                          padding: 10px 20px;
                          text-decoration: none;
                          border-radius: 5px;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="header">
                          <h2>Hello from Avinash</h2>
                      </div>
                      <div class="content">
                          <p>File Name: ${doc.name}</p>
                          <p>Click on the link below to open/download: ${doc.imageUrl}
                          
                          </p>
                           
                      </div>
                      
                      
                     
                  </div>
              </body>
              </html>`,
    });

    console.log("INfo =>", info);
  } catch (error) {
    console.log("Error in Save in post middleware =>", error.message);
    console.log("Error in Save in post middleware =>", error);
  }
});

module.exports = mongoose.model("File", FileSchema);

// frorose article how mail works (article on SMTP)
// AWS SQS , SNS
