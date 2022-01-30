const DoctorRepository = require("../repository/mysql2/DoctorRepository");

exports.getDoctor = (req, res, next) => {
  DoctorRepository.getDoctor()
    .then(emps => {
      res.status(200).json(emps);
    })
    .catch(err => {
      console.log(err);
    });
};
