const { MongoClient } =  require('mongodb');
const mongoDbUrl = 'mongodb://localhost/smsDB';

let _db;
const initDb = callback => {
  if(_db) {
    console.log('DB is already initialized');
    return callback(null, _db);
  }

  MongoClient.connect(mongoDbUrl).then(client => {
    _db = client.db();
    callback(null, _db);
    }).catch(err => {
      console.log(err);
    })
}

const getDb = () => {
  if(!_db) {
    throw Error('Database not initialized')
  }
  return _db;
}

module.exports ={
  initDb,
  getDb
}
