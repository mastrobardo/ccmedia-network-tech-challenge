import { Item } from "@domain/Item";
import { sanitize } from "@utils/sanitize";
import "./card.less";

export function Card(item: Item): HTMLElement {
  // Determine the background color based on the first digit of the IBU value
  const ibuFirstDigit = item.ibu.toString().charAt(0);
  const bgColorClass = `bg${ibuFirstDigit}`;

  const template = `
    <div class="card" data-id="${item.id}">
      <img src="${item.image_url}" alt="${sanitize(item.name)}" class="card-image" style="margin-top: 30px">
      <div class="ribbon ribbon-top-right"><span>${sanitize(item.abv + "%")}</span></div>
      <div class="ibu-rectangle ${bgColorClass}"><span>IBU: ${sanitize(item.ibu.toString())}</span></div>
      <div class="name">${sanitize(item.name)}</div>
    </div>
  `;

  const element = document.createElement("div");
  element.innerHTML = template.trim();

  const cardElement = element.firstChild as HTMLElement;

  cardElement.addEventListener("touchend", () => {
    const event = new CustomEvent("cardClick", {
      bubbles: true,
      detail: { item },
    });
    document.dispatchEvent(event);
  });

  return cardElement;
}
