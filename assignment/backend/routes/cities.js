const express = require("express");
const router = express.Router();

const { getDb } = require("../db");

router.get("/", (req, res) => {
  getDb()
    .collection("cities")
    .find({})
    .skip(0)
    .limit(20).toArray()
    .then((docs) => {
      console.log();
      res.status(200).json(docs);
    });
});

module.exports = router;
