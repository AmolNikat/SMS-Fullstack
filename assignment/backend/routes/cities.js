const express = require("express");
const router = express.Router();

const { getDb } = require("../db");
const { getFormattedDate } = require("../utils/date-utils");

const collection = "cities";

router.get("/", async (req, res) => {
  const queryParams = req.query;
  const start_date = queryParams.start_date,
    end_date = queryParams.start_date;
  (sortColumn = queryParams.sortColumn),
    (sortDirection = queryParams.sortDirection === "asc" ? 1 : -1),
    (pageNumber = parseInt(queryParams.pageNumber) || 1),
    (pageSize = parseInt(queryParams.pageSize) || 5);

  let column = "city";
  const cities = [];
  const totalCount = await getDb().collection(collection).find({}).count();

  if (start_date && end_date) {
    console.log("inside date filter");
    getDb()
      .collection(collection)
      .find(
        {
          start_date: {
            $gte: start_date,
          },
        },
        {
          end_date: {
            $lt: end_date,
          },
        }
      )
      .skip((pageSize - 1) * pageSize)
      .limit(Number.parseInt(pageSize))
      .forEach((city) => {
        city.start_date = getFormattedDate(city.start_date);
        city.end_date = getFormattedDate(city.end_date);
        cities.push(city);
      })
      .then((docs) => {
        res.status(200).json({ payload: cities, totalCount });
      });
  }

  getDb()
    .collection(collection)
    .find({})
    .sort({ sortColumn: sortDirection })
    .skip((pageSize - 1) * pageSize)
    .limit(Number.parseInt(pageSize))
    .forEach((city) => {
      city.start_date = getFormattedDate(city.start_date);
      city.end_date = getFormattedDate(city.end_date);
      cities.push(city);
    })
    .then((docs) => {
      res.status(200).json({ payload: cities, totalCount });
    });
});

module.exports = router;
