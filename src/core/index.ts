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

console.log("Welcome to ts-text-replacer CLI!");
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
      console.log("Enter command: VAR / TXT / EXIT\n");
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

  if (cmd === "VAR") {
    state = "var_input";
    console.log("\nEnter variables (key=value). Press Enter twice when done.");
  } else if (cmd === "TXT") {
    state = "template_input";
    templateLines = [];
    console.log("\nEnter template. Press Enter twice when done.");
  } else if (cmd === "EXIT") {
    console.log("Exiting...");
    rl.close();
  } else if (cmd !== "") {
    console.log("Unknown command. Use VAR / TXT / EXIT");
  }

  emptyCount = 0; // reset for variable/template multi-line input
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
      console.log("Enter command: VAR / TXT / EXIT\n");
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
      console.log("Enter command: VAR / TXT / EXIT\n");
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
