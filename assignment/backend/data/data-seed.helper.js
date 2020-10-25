const citiesData = require("./data.json");

const seedData = async (db, callback) => {
  const bulkUpdateOps = citiesData.map((city) => {
    return {
      updateOne: {
        filter: { _id: city._id },
        update: {
          $set: {
            ...city,
            start_date: new Date(city.start_date).toISOString(),
            end_date: new Date(city.end_date).toISOString(),
          },
        },
        upsert: true,
      },
    };
  });
  try {
    const result = await db
      .collection("cities")
      .bulkWrite(bulkUpdateOps);
    callback(null, result);
  } catch (error) {
    console.log(error);
    callback(error);
  }
};

module.exports = { seedData };
