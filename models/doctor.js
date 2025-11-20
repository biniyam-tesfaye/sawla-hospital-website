const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'doctors.json');

function readDoctors() {
  try {
    const file = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(file);
  } catch (err) {
    return [];
  }
}

exports.findAll = () => {
  return readDoctors();
};



