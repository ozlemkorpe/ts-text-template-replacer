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

- Written in **TypeScript**
- Runs as a **CLI tool**
- No UI, no dependencies, no overhead
- Clear separation between core logic and CLI
- Easy to extend in the future

---

## 🔧 Placeholder Syntax

Placeholders in the text must be written using **curly brackets**:

```
{{variable_name}}
```

### Example
```
Lorem ipsum dolor sit {{variable}} amet, consectetur adipiscing elit. Vivamus  {{variable2}} eleifend nibh non varius volutpat.
```

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

---

## 🧠 How It Works

1. The CLI reads variables
2. Variables are stored as key-value pairs
3. The CLI then reads the template text 
4. All `{{key}}` placeholders are replaced with their corresponding values
5. The final result is printed to the terminal

---

## 🗂 Project Structure

```
src/
├── core/
│   └── replaceTemplate.ts  # Core replacement logic
│   └── index.ts  # CLI entry point
```

---

## ▶️ Usage

Run the CLI tool:

```bash
node dist/core/index.js
```

### Step 1 – Enter variables  
Enter variables in `key=value` format.  
When you are done, press **Enter** twice

```
ENV=production
PORT=8080
```

---

### Step 2 – Enter the template text  
After variable input ends, enter your template text.  
Finish again with pressing **Enter** twice.

```
echo "Starting server in {{ENV}} mode"
node server.js --port={{PORT}}
```

---

### Output

```
echo "Starting server in production mode"
node server.js --port=8080
```

---
