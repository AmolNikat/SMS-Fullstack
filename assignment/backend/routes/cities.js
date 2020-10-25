const express = require("express");
const router = express.Router();

const { getDb } = require("../db");
const  { getFormattedDate } = require('../utils/date-utils');

const collection = 'cities';

router.get("/", async (req, res) => {
  const queryParams = req.query;
  const start_date = queryParams.start_date,
  end_date = queryParams.start_date
  sortColumn = queryParams.sortColumn,
  sortDirection = queryParams.sortDirection === 'asc' ? 1 : -1,
  pageNumber = parseInt(queryParams.pageNumber) || 1,
  pageSize = parseInt(queryParams.pageSize) || 5;


const cities = [];
 const totalCount = await getDb()
  .collection(collection)
  .find({}).count();

  getDb()
    .collection(collection)
    .find({})
    .sort({sortColumn: sortDirection})
    .skip((pageSize - 1) * pageSize)
    .limit(Number.parseInt(pageSize))
    .forEach(city => {
        city.start_date = getFormattedDate(city.start_date);
        city.end_date = getFormattedDate(city.end_date);
        cities.push(city);
    })
    .then(docs => {
      res.status(200).json({payload: cities, totalCount});
    });
});


// router.get("/", (req, res) => {
//   const query = req.query;
//   const queryPage = query.pageNumber;
//   const pageSize = query.pageSize;
//   const cities = [];
//   getDb()
//     .collection("cities")
//     .find({})
//     .skip((queryPage - 1) * pageSize)
//     .limit(Number.parseInt(pageSize))
//     .forEach(city => {
//         city.start_date = getFormattedDate(city.start_date);
//         city.end_date = getFormattedDate(city.end_date);
//         cities.push(city);
//     })
//     .then(docs => {
//       res.status(200).json({payload: cities, totalCount});
//     });
// });
  // });
module.exports = router;
