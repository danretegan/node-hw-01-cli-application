import colors from "colors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}\\db\\contacts.json`;

//TODO CRUD:

//! Read:
async function listContacts() {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const products = JSON.parse(contents);
    console.table(products);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

listContacts();
