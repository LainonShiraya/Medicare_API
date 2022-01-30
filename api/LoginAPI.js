const PatientRepository = require("../repository/mysql2/LoginRepository");

exports.getLogin = (req, res, next) => {
  const lekId = req.params.lekarzId;
  const haslo = req.params.haslo;
  PatientRepository.getLogin(lekId,haslo)
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
