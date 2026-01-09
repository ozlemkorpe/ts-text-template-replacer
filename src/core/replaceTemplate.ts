import chalk from "chalk";

export function replaceTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    // {var} [var] 
    const pattern = new RegExp(`[{\\[]\\s*${key}\\s*[}\\]]`, "g");
    // Green variables
    result = result.replace(pattern, chalk.green(value));
  }

  return result;
}
