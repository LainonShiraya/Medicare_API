const PatientRepository = require("../repository/mysql2/PatientRepository");
var nodemailer = require("nodemailer");
var generator = require("generate-password");
require("dotenv").config();
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

exports.showPatientList = async (req, res, next) => {
  const variable = await req.session.user;
  console.log(variable);
  if (variable) {
    PatientRepository.getAllPatients().then(emps => {
      res.send(emps);
    });
  } else {
    res.send({ error: "error" });
  }
};

exports.showPatientDetail = async (req, res, next) => {
  if (req.session.user) {
    const appo = await PatientRepository.getPatientDetailAppointment(
      req.params.patientId
    );
    const ref = await PatientRepository.getPatientDetailReferral(
      req.params.patientId
    );
    PatientRepository.getPatientDetail(req.params.patientId).then(emps => {
      if (appo.length > 0) {
        emps.appointments = appo;
      } else {
        emps.appointments = [];
      }
      if (ref.length > 0) {
        emps.prescriptions = ref;
      } else {
        emps.prescriptions = [];
      }
      res.send(emps);
    });
  } else {
    res.send({ error: "Could not find user details" });
  }
};
exports.showEditPatientForm = (req, res, next) => {
  if (req.session.login) {
    const Data = { ...req.body };
    res.render("addProfile_patient", {
      navLocation: "patients",
      patient: Data,
    });
  } else {
    res.redirect("..");
  }
};

exports.AddPatientForm = async (req, res, next) => {
  const variable = await req.session.user;
  let patientExist = false;
  if (variable) {
    const Data = { ...req.body };
    var password = generator.generate({
      length: 10,
      numbers: true,
    });
    await PatientRepository.getAllPatients().then(emps => {
      emps.forEach(emp => {
        if (emp.pesel == Data.pesel) {
          patientExist = true;
        }
      });
    });
    console.log(patientExist);
    if (!patientExist) {
      PatientRepository.AddPatient(Data, password).then(emps => {
        var mailOptions = {
          from: process.env.APP_EMAIL,
          to: Data.email,
          subject:
            Data.name +
            " " +
            Data.lastName +
            " you sucessfuly been registered on MediCare app !",
          text:
            "Welcome " +
            Data.name +
            " " +
            Data.lastName +
            " you have sucessfuly registered on MediCare app by our Med service !" +
            "take care of your health with us ! " +
            " here's your auto-generated password to login with MediCare , be sure to change it as fast as possible! : " +
            password,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.send({ status: "sucessfuly added" });
      });
    } else {
      res.send({
        error: "User with that ID is registered in our application ",
      });
    }
  } else {
    res.send({
      error:
        "Not verified user, if error occurs after logging in, try to relog",
    });
  }
};
exports.showUpdatePatient = (req, res, next) => {
  if (req.session.login) {
    PatientRepository.getPatientDetail(req.params.patientId).then(emps => {
      res.render("editProfile_patient", {
        navLocation: "patients",
        patient: emps,
      });
    });
  } else {
    res.redirect("..");
  }
};

exports.UpdatePatient = async (req, res, next) => {
  if (req.session.user) {
    const Data = { ...req.body };
    if (
      Data.Patient.pesel &&
      Data.Patient.email &&
      Data.Patient.name &&
      Data.Patient.lastName
    ) {
      PatientRepository.updatePatientDetails(
        Data.Patient.pesel,
        Data.Patient
      ).then(emps => {
        console.log(emps);
        res.send("sucessfuly edited Patient");
      });
    } else {
      res.send({ error: "Patient does not exist" });
    }
  } else {
    res.send({ error: " Couldnt edit the patient " });
  }
};

exports.DeletePatient = async (req, res, next) => {
  if (req.session.user && req.session.user.Role === "Admin") {
    const Data = { ...req.params };
    PatientRepository.DeletePatient(Data.patientId).then(emps => {
      res.send("User sucessfuly deleted");
    });
  } else {
    res.send({ error: "Error deleting user" });
  }
};
