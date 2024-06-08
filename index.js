const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDb = require('./config/database');
const user  = require("./routes/user")

const port = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1",user)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.listen(port, () => {
  connectDb();
  console.log(`Server listening on port ${port}`);
});