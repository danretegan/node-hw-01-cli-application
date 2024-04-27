import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} from "./contacts.js";
import colors from "colors";

const argv = yargs(hideBin(process.argv))
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => invokeAction({ action: "list" }),
  })
  .command({
    command: "get <id>",
    describe: "Get contact by ID",
    builder: (yargs) => yargs.positional("id", { describe: "Contact ID" }),
    handler: (argv) => invokeAction({ action: "get", id: argv.id }),
  })
  .command({
    command: "add <name> <email> <phone>",
    describe: "Add a new contact",
    builder: (yargs) => {
      yargs.positional("name", { describe: "Contact name" });
      yargs.positional("email", { describe: "Contact email" });
      yargs.positional("phone", { describe: "Contact phone number" });
    },
    handler: (argv) =>
      invokeAction({
        action: "add",
        name: argv.name,
        email: argv.email,
        phone: argv.phone,
      }),
  })
  .command({
    command: "remove <id>",
    describe: "Remove contact by ID",
    builder: (yargs) => yargs.positional("id", { describe: "Contact ID" }),
    handler: (argv) => invokeAction({ action: "remove", id: argv.id }),
  }).argv;

const text = `
  # Obținerea și afișarea întregii liste de contacte sub formă de tabel (console.table):
  node index.js list

  # Obținerea unui contact după id:
  node index.js get idxyz123 => inlocuieste 'idxyz123' cu id-ul dorit!

  # Adăugarea unui contact:
  node index.js add Mango mango@gmail.com 322-22-22

  # Ștergerea unui contact:
  node index.js remove idxyz123 => inlocuieste 'idxyz123' cu id-ul dorit!
`;

const coloredText = text
  .split("\n")
  .map((line) => (line.startsWith("  node") ? line.red : line))
  .join("\n");

if (argv._.length === 0) {
  console.log(coloredText);
} else {
  console.error("Unknown action type: " + argv._[0].red);
}

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        listContacts();
      } catch (error) {
        console.error("Error listing contacts:", error.message.red);
      }
      break;

    case "get":
      try {
        getContactById(id);
      } catch (error) {
        console.error("Error getting contact by ID:", error.message.red);
      }
      break;

    case "add":
      try {
        addContact(name, email, phone);
      } catch (error) {
        console.error("Error adding contact:", error.message.red);
      }
      break;

    case "remove":
      try {
        removeContact(id);
      } catch (error) {
        console.error("Error removing contact by ID:", error.message.red);
      }
      break;

    default:
      console.error("Unknown action type: " + action.red);
  }
}
