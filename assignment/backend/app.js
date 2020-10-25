const express = require("express");
const { initDb, getDb } = require("./db");
const { seedData } = require("./data/data-seed.helper");
// const bodyParser = require('body-parser');

const cityRoutes = require('./routes/cities');

const app = express();
const PORT = process.env.port || 3000;
// app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set CORS headers so that the Angular SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.status(200).json({});
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  // );
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/api/cities', cityRoutes);

initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to DB');
    seedData(db, (err, result) => {
      if (err) {
        console.log("Error in seeding data", err);
      } else {
        console.log("Data Seed Done...!!");
        app.listen(PORT, () => {
          console.log("listening on port: ", PORT);
        });
      }
    });
  }
});

