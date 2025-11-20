const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'appointments.json');

function readAppointments() {
  try {
    const file = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(file);
  } catch (err) {
    return [];
  }
}

function writeAppointments(appointments) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(appointments, null, 2), 'utf-8');
}

exports.save = (appointment) => {
  const appointments = readAppointments();
  appointments.push(appointment);
  writeAppointments(appointments);
};

exports.findAll = () => {
  return readAppointments();
};



