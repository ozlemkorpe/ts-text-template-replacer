export type Variables = Record<string, string>;

export function replaceTemplate(
  template: string,
  variables: Variables
): string {
  let output = template;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    output = output.replace(regex, value);
  }

  return output;
}
