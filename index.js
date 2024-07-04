const express = require("express");
const app = express();
const { db } = require("./config/database");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
const upload = require("./routes/upload");
db();
cloudinary.cloudinaryConnect();

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT no. ${PORT}`);
});

app.use("/api/v1/upload", upload);
