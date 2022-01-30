const db = require("../../config/mysql2/db");

exports.getDoctor = () => {
  return db
    .promise()
    .query("Select * from Doctor")
    .then((results, fields) => {
      console.log(results[0], fields);
      return results[0];
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
