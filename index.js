const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors'); 
const app = express();
const connectDb = require('./config/database');
const user  = require("./routes/user")
const Users = require("./model/user");
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1",user)

// Middleware setup
app.use(cors({
  origin: '*', // Adjust this to your specific origin as needed
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
}));


app.listen(port, async() => {
  connectDb();
  console.log(`Server listening on port ${port}`);
  
  
});