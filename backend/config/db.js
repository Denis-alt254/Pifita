const {default: mongoose} = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully.");
    } catch (error) {
        console.error({MongoError: error});
        process.exit(1);
    }
};

module.exports = connectDB;