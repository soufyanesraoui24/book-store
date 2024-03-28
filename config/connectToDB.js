const mongoose = require('mongoose');;

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected....^_^....`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = connectToDB;