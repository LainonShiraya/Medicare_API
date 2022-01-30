var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/mysql2/db");
const PatientRepository = require("../repository/mysql2/PatientRepository");

require("dotenv").config();
const salt = bcrypt.genSaltSync(8);
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { loginFail: req.session.loginFail });
});

router.get("/logout", function (req, res, next) {
  if (req.session.user) {
    req.session.destroy();
  }
  res.send({ status: "done" });
});
function hashPassword(passPlain) {
  const passHashed = bcrypt.hashSync(passPlain, salt);
  return passHashed;
}
function comparePasswords(passPlain, passHash) {
  if (passHash) {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
  }
  return false;
}
router.post("/", function (req, res, next) {
  let username = req.body.username;
  if (!username > 0 || !req.body.password > 0) {
    res.send({ error: "Login and/or password cannot be empty" });
  } else {
    db.query(
      "select * from doctor where Id_doctor = ?",
      [username],
      (error, results) => {
        if (error) {
          res.send({ err: error });
        } else {
          if (
            results.length > 0 &&
            comparePasswords(req.body.password, results[0].Password)
          ) {
            delete results[0].Password;
            req.session.user = results[0];
            req.session.save();
            res.send(results);
          } else {
            db.query(
              "select * from patient where Id_patient = ?",
              [username],
              (error, results) => {
                if (error) {
                  res.send({ err: error.message });
                } else {
                  if (
                    results.length > 0 &&
                    comparePasswords(req.body.password, results[0].Password)
                  ) {
                    delete results[0].Password;
                    req.session.user = results[0];
                    req.session.save();
                    res.send(results);
                  } else {
                    res.send({
                      err: "Wrong password/login combination",
                    });
                  }
                }
              }
            );
          }
        }
      }
    );
  }
});

router.post("/addappointment", function (req, res, next) {
  const Data = { ...req.body };
  const today = new Date().toLocaleString().split(",")[0];
  if (!req.session.user) {
    res.send("not allowed for your role");
  }
  if (
    !(
      Data.appointmentID ||
      Data.visitDate ||
      Data.title ||
      Data.notes ||
      Data.Hour
    )
  ) {
    res.send({ error: "Columns cannot be empty" });
  } else {
    db.query(
      "Insert into appointment(Description,Doctor_Id_doctor,Patient_Id_patient,Visit_date,Title,Hour) values (?,?,?,?,?,?)",
      [
        Data.notes,
        Data.doctorId,
        Data.patientId,
        Data.visitDate,
        Data.title,
        Data.Hour,
      ],
      (error, results) => {
        if (error) {
          res.send({ err: error });
        } else {
          PatientRepository.getPatientDetail(Data.patientId).then(response => {
            var mailOptions = {
              from: process.env.APP_EMAIL,
              to: response.email,
              subject:
                response.name +
                " " +
                response.lastName +
                " you sucessfuly registered for appointment on MediCare app !",
              text:
                "Welcome " +
                response.name +
                " " +
                response.lastName +
                " you have sucessfuly registered for appointment on MediCare app !" +
                "take care of your health with us ! Your appointment is at :  " +
                Data.visitDate +
                " " +
                Data.Hour,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          });
          res.send("Appointment sucessfuly added");
        }
      }
    );
  }
});

router.get("/appointment/delete/?:id", function (req, res, next) {
  if (!req.session.user) {
    res.send("not allowed for your role");
  }
  if (!req.params.id) {
    res.send({ error: "There's a problem with visit ID" });
  } else {
    db.query("Call DeleteWithOutput(?);", [req.params.id], (error, results) => {
      if (error) {
        console.log(error);
        res.send({ err: error });
      }
      console.log(results);
      PatientRepository.getPatientDetail(results[0][0].Patient_Id_patient).then(
        response => {
          var mailOptions = {
            from: process.env.APP_EMAIL,
            to: response.email,
            subject:
              response.name +
              " " +
              response.lastName +
              " your Appointment has been sucessfuly canceled on MediCare app !",
            text:
              "Welcome " +
              response.name +
              " " +
              response.lastName +
              " your Appointment has been sucessfuly canceled on MediCare app  !" +
              "We are sorry you had to cancel it, hopefuly it is just temporary  ",
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      );
      res.send("Appointment sucessfuly removed");
    });
  }
});

router.post("/addreception", function (req, res, next) {
  const Data = { ...req.body };
  const date = Data.expireDate.toString();
  if (!req.session.user) {
    res.send("not allowed for your role");
  } else if (
    !(Data.receptionId || Data.expireDate || Data.extendedDate || Data.title)
  ) {
    res.send({ error: "Columns cannot be empty!" });
  } else {
    db.query(
      "Insert into prescription(Description,Title,Expiration_date,Appointment_date,Doctor_Id_doctor,Patient_Id_patient) values (?,?,?,?,?,?)",
      [
        Data.notes,
        Data.title,
        Data.extendedDate,
        date,
        Data.doctorId,
        Data.patientId,
        Data.hour,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
          res.send({ err: error });
        } else {
          PatientRepository.getPatientDetail(Data.patientId).then(response => {
            console.log("this is response");
            console.log(response);
            var mailOptions = {
              from: process.env.APP_EMAIL,
              to: response.email,
              subject:
                response.name +
                " " +
                response.lastName +
                " you sucessfuly recived prescription on MediCare app !",
              text:
                "Welcome " +
                response.name +
                " " +
                response.lastName +
                " you have sucessfuly recived prescription on MediCare app !" +
                "take care of your health with us ! Your appointment is at :  " +
                Data.title +
                " prescribed:  " +
                Data.notes,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          });
          res.send("sucessfuly added Reception");
        }
      }
    );
  }
});

router.post("/addUser", function (req, res, next) {
  const Data = { ...req.body };
  const password = hashPassword(Data.password);
  if (
    !(Data.password || Data.workerId || Data.lastName || password || Data.email)
  ) {
    res.send({ error: "Columns cannot be empty" });
  } else {
    db.query(
      "Insert into patient(Id_patient,Name,Last_name,Email,Password) values (?,?,?,?,?)",
      [Data.workerId, Data.name, Data.lastName, Data.email, password],
      (error, results) => {
        if (error) {
          console.log(error);
          res.send({ err: error });
        } else {
          var mailOptions = {
            from: process.env.APP_EMAIL,
            to: Data.email,
            subject:
              Data.name +
              " " +
              Data.lastName +
              " you sucessfuly registered on MediCare app !",
            text:
              "Welcome " +
              Data.name +
              " " +
              Data.lastName +
              " you have sucessfuly registered on MediCare app !" +
              "take care of your health with us ! ",
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.send("sucessfuly created User");
        }
      }
    );
  }
});

module.exports = router;
