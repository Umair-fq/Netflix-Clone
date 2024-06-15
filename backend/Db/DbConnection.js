const mongoose = require('mongoose');
require('dotenv').config();

const DBURI = process.env.DBURI;

const dbConnection = async () => {
    try {
        await mongoose.connect(DBURI);
        console.log('Connected to database');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


module.exports = dbConnection;