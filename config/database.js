const mongoose = require("mongoose");
require("dotenv").config();

exports.db = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
      console.log("Error while DB connection =>", err.message);
      console.log("Error =>", err);
      process.exit(1);
    });
};
