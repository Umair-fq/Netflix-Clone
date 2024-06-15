const express = require('express');
const app = express();
const cors = require("cors");
const dbConnection = require('./Db/DbConnection');
require('dotenv').config();
const userRoutes = require('./Routers/UserRouter')
app.use(express.json());
app.use(cors())

dbConnection();


app.use('/api/user', userRoutes);
const port = process.env.PORT || 8000;
app.listen(8081, () => {
    console.log(`listening on ${8081}`);
})

