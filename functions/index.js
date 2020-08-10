const functions = require('firebase-functions');
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


const userRoutes = require("./routes/UserRoutes");

const PORT = process.env.PORT || 8081;

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/user",userRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});  

exports.app = functions.https.onRequest(app);