import * as readline from "readline";
import { replaceTemplate } from "./replaceTemplate";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type State = "init_vars" | "command" | "var_input" | "template_input";

let state: State = "init_vars";
let emptyCount = 0;

const variables: Record<string, string> = {};
let templateLines: string[] = [];

console.log("Welcome to Text Replacer CLI!");
console.log("Enter variables as key=value format.");
console.log("Press Enter twice to finish variable input.\n");

rl.on("line", (line) => {
  if (line.trim() === "") {
    emptyCount++;
  } else {
    emptyCount = 0;
  }

  // --------------------
  // INIT VARIABLE INPUT
  // --------------------
  if (state === "init_vars") {
    if (emptyCount === 2) {
      state = "command";
      emptyCount = 0;
      console.log("\n--- COMMAND MODE ---");
      console.log("Enter command: VAR / TXT / EXIT / SHOW / HELP / CLEAR\n");
      return;
    }

    processVariableLine(line);
    return;
  }

// --------------------
// COMMAND MODE
// --------------------
if (state === "command") {
  const cmd = line.trim().toUpperCase();

  switch (cmd) {
    case "VAR":
      state = "var_input";
      emptyCount = 0;
      console.log("\nEnter variables (key=value). Press Enter twice when done.");
      break;
    case "TXT":
      state = "template_input";
      templateLines = [];
      emptyCount = 0;
      console.log("\nEnter template. Press Enter twice when done.");
      break;
    case "SHOW":
      console.log("\n--- CURRENT VARIABLES ---");
      if (Object.keys(variables).length === 0) {
        console.log("No variables defined yet.");
      } else {
        for (const [key, value] of Object.entries(variables)) {
          console.log(`${key} = ${value}`);
        }
      }
      console.log("-------------------------\n");
      break;
    case "HELP":
      console.log("\nAvailable Commands:\n");
      console.log("VAR   - Adds new variables or overwrites existing ones. Variables are stored in the current session and can be used in subsequent templates.");
      console.log("TXT   - Allows you to input a multi-line template using {variable_name} or [variable_name] placeholders. After pressing Enter twice, the tool performs replacement using current session variables and outputs the result.");
      console.log("SHOW  - Displays all currently defined variables in the session.");
      console.log("CLEAR - Clears the terminal screen and returns to command prompt.");
      console.log("EXIT  - Terminates the application gracefully, preserving session data only during runtime.");
      console.log("HELP  - Displays this list of available commands and their descriptions.\n");
      break;
    case "CLEAR":
      console.clear();
      console.log("--- COMMAND MODE ---");
      console.log("Enter command: VAR / TXT / EXIT / SHOW / HELP / CLEAR\n");
      break;
    case "EXIT":
      console.log("Exiting...");
      rl.close();
      break;
    default:
      if (cmd !== "") console.log("Unknown command. Use VAR / TXT / EXIT / SHOW / HELP / CLEAR");
      break;
  }

  return;
}



  // --------------------
  // VARIABLE INPUT MODE
  // --------------------
  if (state === "var_input") {
    if (emptyCount === 2) {
      state = "command";
      emptyCount = 0;
      console.log("\n--- COMMAND MODE ---");
      console.log("Enter command: VAR / TXT / EXIT / SHOW / HELP / CLEAR\n");
      return;
    }

    processVariableLine(line);
    return;
  }

  // --------------------
  // TEMPLATE INPUT MODE
  // --------------------
  if (state === "template_input") {
    if (emptyCount === 2) {
      state = "command";
      emptyCount = 0;

      const template = templateLines.join("\n");
      const result = replaceTemplate(template, variables);

      console.log("\n--- OUTPUT ---\n");
      console.log(result);
      console.log("\n--- COMMAND MODE ---");
      console.log("Enter command: VAR / TXT / EXIT / SHOW / HELP / CLEAR\n");
      return;
    }

    templateLines.push(line);
    return;
  }
});

// --------------------
// HELPER FUNCTION
// --------------------
function processVariableLine(line: string) {
  if (!line.includes("=")) return;

  const [key, ...rest] = line.split("=");
  const value = rest.join("=").trim();
  if (key && value !== undefined) {
    variables[key.trim()] = value;
  }
}
