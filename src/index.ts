#!/usr/bin/env node

import readline from "readline";
import { replaceTemplate, Variables } from "./core/replaceTemplate";

const variables: Variables = {};
const variableLines: string[] = [];
const textLines: string[] = [];

// Variable Input
const varRl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Enter variables in key=value format (press Enter, then Ctrl+D to finish):");

varRl.on("line", (line: string) => {
  variableLines.push(line);
});

varRl.on("close", () => {
  for (const line of variableLines) {
    const [key, value] = line.split("=");
    if (key && value) {
      variables[key.trim()] = value.trim();
    }
  }

  // Text Input
  const textRl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("\nEnter the text (press Enter, then Ctrl+D to finish):");

  textRl.on("line", (line: string) => {
    textLines.push(line);
  });

  textRl.on("close", () => {
    const template = textLines.join("\n");
    const result = replaceTemplate(template, variables);

    console.log("\n--- OUTPUT ---\n");
    console.log(result);
  });
});
