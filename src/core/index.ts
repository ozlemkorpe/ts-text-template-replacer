import * as readline from "readline";
import chalk from "chalk";
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

// Açılış mesajı
console.log(chalk.greenBright("Welcome to ts-text-replacer CLI!"));
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
      showCommandPrompt();
      return;
    }
    processVariableLine(line);
    return;
  }

  // --------------------
  // COMMAND MODE
  // --------------------
  if (state === "command") {
      const parts = line.trim().split(" ");
      const cmd = parts[0].toUpperCase();
      const args = parts.slice(1);

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
          console.log(chalk.red("No variables defined yet."));
        } else {
          for (const [key, value] of Object.entries(variables)) {
            console.log(chalk.green(`${key}`) + " = " + value);
          }
        }
        console.log("-------------------------\n");
        break;
      case "DELETE":
        if (args.length === 0) {
          console.log(chalk.red("Please specify a variable name to delete. Example: DELETE var1"));
        } else {
          const varName = args[0];
          if (variables[varName] !== undefined) {
            delete variables[varName];
            console.log(chalk.green(`Variable "${varName}" deleted.`));
          } else {
            console.log(chalk.red(`Variable "${varName}" does not exist.`));
          }
      }
      break;
      case "HELP":
        console.log("\nAvailable Commands:\n");
        console.log(chalk.blue("VAR   ") + "- Adds new variables or overwrites existing ones. Variables are stored in the current session and can be used in subsequent templates.");
        console.log(chalk.blue("TXT   ") + "- Input a multi-line template using {variable_name} or [variable_name]. After Enter twice, replaced template is shown.");
        console.log(chalk.blue("SHOW  ") + "- Displays all currently defined variables in the session.");
        console.log(chalk.blue("DELETE") + "- Deletes a previously defined variable. Usage: DELETE variable_name");
        console.log(chalk.blue("CLEAR ") + "- Clears the terminal screen and returns to command prompt.");
        console.log(chalk.blue("EXIT  ") + "- Terminates the application gracefully, preserving session data only during runtime.");
        console.log(chalk.blue("HELP  ") + "- Displays this list of available commands and their descriptions.\n");
        break;
      case "CLEAR":
        console.clear();
        showCommandPrompt();
        break;
      case "EXIT":
        console.log(chalk.blue("Exiting..."));
        rl.close();
        break;
      default:
        if (cmd !== "") console.log(chalk.red("Unknown command. Use VAR / TXT / SHOW / DELETE / HELP / CLEAR / EXIT"));
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
      showCommandPrompt();
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
      showCommandPrompt();
      return;
    }
    templateLines.push(line);
    return;
  }
});

// --------------------
// HELPERS
// --------------------
function processVariableLine(line: string) {
  const trimmed = line.trim();
  if (trimmed === "") return;

  const varPattern = /^[A-Za-z_][A-Za-z0-9_]*=.*$/;

  if (!varPattern.test(trimmed)) {
    console.log(chalk.red(`Invalid variable format: "${line}". Use VAR=value format.`));
    return; // kaydetme
  }

  const [key, ...rest] = trimmed.split("=");
  const value = rest.join("=").trim();

  variables[key.trim()] = value;
  console.log(chalk.green(`Variable "${key.trim()}" set to "${value}"`));
}


function showCommandPrompt() {
  console.log("\n--- COMMAND MODE ---");
  console.log(chalk.blue("Enter command: VAR / TXT / SHOW / DELETE / HELP / CLEAR / EXIT\n"));
}
