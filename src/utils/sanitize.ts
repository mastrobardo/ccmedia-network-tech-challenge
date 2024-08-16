export function sanitize(input: string): string {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
