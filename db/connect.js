const mongoose = require("mongoose");
const customErr = require("../errors");

const connectDb = () => {
  return mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    (err) => {
      if (err) {
        throw new customErr.BadRequestErr(err.message);
      }
      console.log("mongo db connected successfully");
    }
  );
};

module.exports = connectDb;
