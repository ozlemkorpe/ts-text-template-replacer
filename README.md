# TS Text Template Replacer

A simple, lightweight, UI-less **TypeScript CLI tool** for replacing placeholders in text or scripts with user-provided values.

This tool helps you avoid repetitive manual edits by defining variables once and applying them dynamically to any text or script.

---

## 🎯 Purpose

When working with scripts, configs, or text templates, you often need to update the same values repeatedly (names, environments, IDs, etc.).

Instead of editing the script manually every time, this tool allows you to:
- Enter variables and their values
- Paste your template text
- Automatically replace placeholders with the provided values

Minimal, fast, and distraction-free.

---

## ✨ Features

* Multi-line template input with `{variable}` or `[variable]` placeholders.
* Supports adding, updating, showing, and deleting variables in a persistent session.
* Command-based interface to interactively manage variables and templates.
* Color-coded CLI output:

  * Commands: **blue**
  * Variables: **green**
  * Errors/warnings: **red**
  * Replaced template values: **yellow**
* Variable format validation (`VAR=value`).

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/ts-text-replacer.git
cd ts-text-replacer
npm install
```

Compile TypeScript:

```bash
npm run build
```

Run the CLI:

```bash
node dist/core/index.js
```

> ⚠️ Note: For correct interactive behavior, run the CLI in a terminal (cmd, PowerShell, or any terminal that supports stdin). Direct double-click execution of the JS/EXE may not work properly.

---

## 🔧 Usage

### Initial Variable Input

When the CLI starts, it prompts for variables:

```
VAR1=value1
VAR2=value2
[Press Enter twice to finish]
```

* Only valid `VAR=value` format is accepted.
* Variables can be updated by re-entering them.

---

### ▶️ Commands

Once initial variables are set, the CLI enters **command mode**.

| Command  | Description                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `VAR`    | Adds new variables or updates existing ones. Input ends after pressing Enter twice.                                        |
| `TXT`    | Input a multi-line template using `{variable}` or `[variable]`. Press Enter twice to show the output with replaced values. |
| `SHOW`   | Displays all currently defined variables.                                                                                  |
| `DELETE` | Deletes a previously defined variable. Usage: `DELETE variable_name`                                                       |
| `CLEAR`  | Clears the terminal screen and returns to command prompt.                                                                  |
| `HELP`   | Displays this list of available commands and explanations.                                                                 |
| `EXIT`   | Exits the CLI.                                                                                                             |

---

### Template Example

Input:

```
echo "Starting server in {ENV} mode"
node server.js --port={PORT}
```

Given variables:

```
ENV=production
PORT=8080
```

Output:

```
echo "Starting server in production mode"
node server.js --port=8080
```


### Notes

* Variable names are case-sensitive.
* Template placeholders must match the variable name exactly (without `{}` or `[]` inside the variable definition).
* You can continuously add, delete, or update variables without restarting the CLI.

---

