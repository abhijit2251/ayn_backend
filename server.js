// I am going start  with which is already install packages
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const loginRouter = require('./routes/login');
const imageRouter = require('./routes/images')

//Database connection

const conn = mongoose.createConnection(process.env.DB_CONNCECT, { useNewUrlParser: true }, () => {
  console.log("Database connected....!!!")
});


let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});


app.use(express.json()); // to handle middle ware
app.use('/api/user', loginRouter);
app.use('/api/image', imageRouter)

app.listen(3000, () => console.log("server running at port 3000"));