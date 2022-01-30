const PatientRepository = require("../repository/mysql2/PatientRepository");

exports.showDoctorList = (req, res, next) => {
  if (req.session.user) {
    PatientRepository.getPatients(req.session.user.Id_doctor).then(emps => {
      res.send(emps);
    });
  } else {
    res.send({
      error:
        "Could not load the database, please try logout and log in again to fix the issue...",
    });
  }
};

exports.showAddDoctorForm = (req, res, next) => {
  if (req.session.login) {
    res.render("editProfile_doctor", { navLocation: "dashboard" });
  } else {
    res.redirect("..");
  }
};

exports.showDoctorDetails = (req, res, next) => {
  if (req.session.login) {
    res.render("editProfile_doctor", { navLocation: "dashboard" });
  } else {
    res.redirect("..");
  }
};
