const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();

const { db } = require('./src/config/')
const { server } = require('./src/config')


app.use(cors())
app.use(require("./src/routes"))

mongoose.connect(db.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wallazon app, made with Express - Mongo - Angular" });
});

app.listen(server.port, () => {
  console.log(`http://ximo.com:${server.port}`);
});
