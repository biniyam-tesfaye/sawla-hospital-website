const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'contacts.json');

function readContacts() {
  try {
    const file = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(file);
  } catch (err) {
    return [];
  }
}

function writeContacts(contacts) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(contacts, null, 2), 'utf-8');
}

exports.save = (contact) => {
  const contacts = readContacts();
  contacts.push(contact);
  writeContacts(contacts);
};



