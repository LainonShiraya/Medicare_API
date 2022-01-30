const PatientRepository = require("../repository/mysql2/PatientRepository");

exports.getPatients = (req, res, next) => {
  const lekId = req.params.lekarzId;
  PatientRepository.getPatients(lekId)
    .then(emps => {
      if (!emps) {
        res
          .status(404)
          .json({ message: "Lekarz z id: " + lekId + " nie znaleziony" });
      } else {
        res.status(200).json(emps);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAllPatients = (req, res, next) => {
  PatientRepository.getAllPatients()
    .then(emps => {
      if (!emps) {
        res
          .status(404)
          .json({ message: "Brak lekarzy w bazie danych: "});
      } else {
        res.status(200).json(emps);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
