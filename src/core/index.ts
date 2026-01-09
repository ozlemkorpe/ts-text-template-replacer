import * as readline from "readline";
import { replaceTemplate } from "./replaceTemplate";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type State = "variables" | "template" | "done";

let state: State = "variables";
let emptyCount = 0;

const variables: Record<string, string> = {};
const templateLines: string[] = [];

console.log("Enter variables as key=value");
console.log("Press Enter twice to finish variables.\n");

rl.on("line", (line) => {
  // boş satır sayacı
  if (line.trim() === "") {
    emptyCount++;
  } else {
    emptyCount = 0;
  }

  // ---- VARIABLES ----
  if (state === "variables") {
    if (emptyCount === 2) {
      state = "template";
      emptyCount = 0;

      console.log("\nEnter template text");
      console.log("Use {{variable_name}} placeholders");
      console.log("Press Enter twice to finish template.\n");
      return;
    }

    if (line.includes("=")) {
      const [key, ...rest] = line.split("=");
      const value = rest.join("=").trim();

      if (key && value !== undefined) {
        variables[key.trim()] = value;
      }
    }

    return;
  }

  // ---- TEMPLATE ----
  if (state === "template") {
    if (emptyCount === 2) {
      state = "done";

      const template = templateLines.join("\n");
      const result = replaceTemplate(template, variables);

      console.log("\n--- OUTPUT ---\n");
      console.log(result);

      waitForExit();
      return;
    }

    templateLines.push(line);
  }
});

// ---- EXIT HANDLER ----
function waitForExit() {
  console.log("\nPress Enter to exit...");
  process.stdin.once("data", () => {
    process.exit(0);
  });
}
