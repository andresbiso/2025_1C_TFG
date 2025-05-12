const mongoose = require("mongoose");
require("dotenv").config();

exports.connectMongoDB = () => {
  const mongoUrl = process.env.MONGO_DB_URL.replace(
    "${MONGO_USERNAME}",
    process.env.MONGO_USERNAME
  )
    .replace("${MONGO_PASSWORD}", process.env.MONGO_PASSWORD)
    .replace("${MONGO_HOST}", process.env.MONGO_HOST)
    .replace("${MONGO_PORT}", process.env.MONGO_PORT)
    .replace("${MONGO_DATABASE}", process.env.MONGO_DATABASE);

  mongoose
    .connect(mongoUrl, {})
    .then(() => {
      console.log("Mongo database connected successfully");
    })
    .catch((error) => {
      console.error("Error while connecting to MongoDB:", error);
      process.exit(1);
    });
};
