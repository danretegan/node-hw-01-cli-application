import colors from "colors";
import { dirname } from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}\\db\\contacts.json`;

//TODO CRUD:

//! Read:
async function listContacts() {
  try {
    const rawData = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(rawData);
    console.table(contacts);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//! Create:
async function addContact(name, email, phone) {
  try {
    const rawData = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(rawData);

    if (!name || !email || !phone) {
      throw new Error("Invalid data provided!");
    }

    const newContactId = randomUUID();
    const newContact = {
      id: newContactId,
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);
    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log("The contact has been created successfully!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//! Delete:
async function removeContact(contactId) {
  try {
    const rawData = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(rawData);

    // Găsim produsul în listă folosind contactId:
    const index = contacts.findIndex((contact) => contact.id === contactId);
    // Verificăm dacă produsul există:
    if (index === -1) {
      throw new Error("Contact not found!");
    }
    // Ștergerea contactului din listă:
    contacts.splice(index, 1);

    // Rescrierea datelor actualizate în fișier:
    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log("The contact has been deleted successfully!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}
