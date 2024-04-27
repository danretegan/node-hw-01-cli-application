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

    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error("Contact not found!");
    }
    contacts.splice(index, 1);

    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log("The contact has been deleted successfully!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//! Get Contact by ID:
async function getContactById(contactId) {
  try {
    // Citim datele din fișier
    const rawData = await readFile(contactsPath, { encoding: "utf8" });
    // Transformam datele brute citite din fișier într-un obiect JavaScript:
    const contacts = JSON.parse(rawData);

    // Căutăm contactul în listă după ID
    const contact = contacts.find((contact) => contact.id === contactId);

    // Verificăm dacă contactul există
    if (!contact) {
      throw new Error("Contact not found!");
    }

    // Afisăm contactul găsit în consolă
    console.log("Contact found:", contact);
    return contact; // Returnăm contactul găsit
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}
