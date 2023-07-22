const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost/test");
    console.log(`Connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connect;
