import chalk from "chalk";

export function replaceTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    // {var} veya [var] şeklinde placeholder
    const pattern = new RegExp(`[{\\[]\\s*${key}\\s*[}\\]]`, "g");
    // Değişken değeri yeşil renkte
    result = result.replace(pattern, chalk.green(value));
  }

  return result;
}
