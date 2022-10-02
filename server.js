const express = require("express");
const app = express();
const port = 50000;
const cors = require("cors");
const config = require("./config");
app.use(cors()); //required, or requests will be blocked from react
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = config.MONGO_URL;
const jwt = require("jsonwebtoken");
//app.use(express.json());

app.use("/", (req, res, next) => {
  console.log("---Base path---");
  next();
});
//Latest node update means you have to specifically add a body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/message", async (req, res) => {
  const db = await MongoClient.connect(url);
  let dbo = db.db("admin");
  const result = await dbo.collection("messages").insertOne(req.body);
  res.json({ successful: result });
});
app.get("/getMessage", async (req, res) => {
  const db = await MongoClient.connect(url);
  let dbo = db.db("admin");
  const result = await dbo
    .collection("messages")
    .findOne({ message: "message1" });
  res.json(result);
});
app.put("/resetBoard", async (req, res) => {
  const db = await MongoClient.connect(url);
  let dbo = db.db("admin");
  await dbo
    .collection("messages")
    .updateOne(
      { message: "message1" },
      { $set: { updated: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
      } } }
    );
  res.end();
  return;
});
app.put("/putMessage", async (req, res) => {
  const db = await MongoClient.connect(url);
  let dbo = db.db("admin");
  await dbo
    .collection("messages")
    .updateOne(
      { message: "message1" },
      { $set: { updated: req.body.message } }
    );
  res.end();
  return;
});
app.listen(process.env.PORT || 50000, () => {
  console.log("---Starting Checkers API---");
});
