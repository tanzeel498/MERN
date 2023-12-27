const express = require("express");
const { ObjectId } = require("mongodb");

const db_connect = require("../db/conn");

const recordRoutes = express.Router();

recordRoutes.route("/record").get(function (req, res) {
  db_connect
    .collection("records")
    .find({})
    .toArray()
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((err) => console.log(err));
});

recordRoutes.route("/record/:id").get(function (req, res) {
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, res) {
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    res.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      res.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.json(obj);
  });
});

module.exports = recordRoutes;
