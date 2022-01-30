const db = require("../../config/mysql2/db");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);
const query = `Select Distinct Id_patient, p.Name, p.Last_name, Email, Visit_date , Hour from patient p
inner join appointment app on app.Patient_Id_patient = p.Id_patient
inner join doctor on doctor.Id_doctor = app.Doctor_Id_doctor where CONVERT(app.Visit_Date, DATE) > DATE(NOW()) AND doctor.Id_doctor = ?`;
exports.getPatients = lekId => {
  return db
    .promise()
    .query(query, [lekId])
    .then((results, fields) => {
      const firstRow = results[0][0];
      if (!firstRow) {
        return {};
      }
      const emp = [];
      for (let i = 0; i < results[0].length; i++) {
        const row = results[0][i];
        console.log(row);
        if (row.Id_patient) {
          const patient = {
            pesel: row.Id_patient,
            name: row.Name,
            lastName: row.Last_name,
            email: row.Email,
            Visit: row.Visit_date,
            hour: row.Hour,
          };
          emp.push(patient);
        }
      }
      return emp;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const query2 = `Select Id_patient, Name, Last_name, Email, Last_visit from patient`;
exports.getAllPatients = () => {
  return db
    .promise()
    .query(query2, [])
    .then((results, fields) => {
      const firstRow = results[0][0];
      if (!firstRow) {
        return {};
      }
      const emp = [];
      for (let i = 0; i < results[0].length; i++) {
        const row = results[0][i];
        if (row.Id_patient) {
          const pacient = {
            pesel: row.Id_patient,
            name: row.Name,
            lastName: row.Last_name,
            email: row.Email,
            lastVisit: row.Last_visit,
          };
          emp.push(pacient);
        }
      }
      return emp;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const query3 = `Select Distinct Id_patient, Name, Last_name, Email, Gender, Blood_type,
Allergies, Diseases, Height, Weight, Last_visit
from patient
where Id_patient = ?`;
exports.getPatientDetail = pacientId => {
  return db
    .promise()
    .query(query3, [pacientId])
    .then((results, fields) => {
      const firstRow = results[0][0];
      if (!firstRow) {
        return {};
      }
      const emp = {
        pesel: firstRow.Id_patient,
        name: firstRow.Name,
        lastName: firstRow.Last_name,
        email: firstRow.Email,
        gender: firstRow.Gender,
        blood: firstRow.Blood_type,
        allergies: firstRow.Allergies,
        diseases: firstRow.Diseases,
        height: firstRow.Height,
        weight: firstRow.Weight,
        lastVisit: firstRow.Last_visit,
      };
      return emp;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const query4 = `Select Id_appointment, Description, Doctor_Id_doctor, Visit_date, title, Hour
from appointment
where Patient_Id_patient = ?`;
exports.getPatientDetailAppointment = pacientId => {
  return db
    .promise()
    .query(query4, [pacientId])
    .then((results, fields) => {
      const firstRow = results[0][0];
      if (!firstRow) {
        return {};
      }
      const emp = [];
      for (let i = 0; i < results[0].length; i++) {
        const row = results[0][i];
        if (row.Id_appointment) {
          const appointment = {
            idBadanie: row.Id_appointment,
            opis: row.Description,
            lekarz: row.Doctor_Id_doctor,
            dataWystawienia: row.Visit_date,
            tytul: row.title,
            godzina: row.Hour,
          };
          emp.push(appointment);
        }
      }
      return emp;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const query5 = `Select Doctor_Id_doctor, Appointment_date, Title , Description, Expiration_date
from prescription
where Patient_Id_patient = ?`;
exports.getPatientDetailReferral = pacientId => {
  return db
    .promise()
    .query(query5, [pacientId])
    .then((results, fields) => {
      const firstRow = results[0][0];
      if (!firstRow) {
        return {};
      }
      const emp = [];
      for (let i = 0; i < results[0].length; i++) {
        const row = results[0][i];
        if (row) {
          const recepta = {
            opis: row.Description,
            lekarz: row.Doctor_Id_doctor,
            dataWizyty: row.Expiration_date,
            dataWaznosci: row.Appointment_date,
            tytul: row.Title,
            wygasa: row.Expiration_date,
          };
          emp.push(recepta);
        }
      }
      return emp;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const query6 =
  `Update patient set Name = ? , Last_name = ? , Email = ?, Allergies = ? , Diseases = ? , Weight = ? , Height = ?, Blood_type = ? ` +
  ` where Id_patient = ?`;
exports.updatePatientDetails = (pacientId, pacient) => {
  return db
    .promise()
    .execute(query6, [
      pacient.name,
      pacient.lastName,
      pacient.email,
      pacient.allergies,
      pacient.diseases,
      pacient.weight,
      pacient.height,
      pacient.blood,
      pacientId,
    ]);
};
function hashPassword(passPlain) {
  const passHashed = bcrypt.hashSync(passPlain, salt);
  return passHashed;
}
const query7 = `insert into patient( Id_patient,Name, Last_name ,Email, Gender , Blood_type , Allergies , Diseases , Weight , Height  , Last_visit,Password ) values (?, ?, ?, ?,?,?,?,?,?,?,?,?)`;
exports.AddPatient = (pacient, password) => {
  console.log("Creating pacient ................");
  var hashedPassword = hashPassword(password);
  const visit = "";
  console.log(password);
  return db
    .promise()
    .execute(query7, [
      pacient.pesel,
      pacient.name,
      pacient.lastName,
      pacient.email,
      pacient.gender,
      pacient.blood,
      pacient.allergies,
      pacient.diseases,
      pacient.weight,
      pacient.height,
      visit,
      hashedPassword,
    ]);
};

const query8 = `Delete from patient where Id_patient = ?`;
exports.DeletePatient = pesel => {
  return db.promise().execute(query8, [pesel]);
};
