// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

var admin = require("firebase-admin");
const port = process.env.PORT || 3001;

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

// Middleware for parsing application/json
app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static("public"));

// Route for handling GET requests
app.get("/", (req, res) => {

  getData(db, "SampleCollection");
  
  res.send("Hello World!");
});

// Route for handling POST requests
app.post("/", async (req, res) => {
  res.send("POST request received");
});
getData = async (db, collection) => {
  const citiesRef = db.collection(collection);
  const snapshot = await citiesRef.where("id", "==", 1).get();
  console.log(snapshot.docs[0].data());
}

sendData = async (db, collection) => {
  const result = await db.collection(collection).add({
    powerData : 170,
    id : 10,
  })
  console.log(result);
}
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
