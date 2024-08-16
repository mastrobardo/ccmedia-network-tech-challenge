import { Item } from "@domain/Item";
import { sanitize } from "@utils/sanitize";
import "./multilevel-dropdown.less";

export function generateDropdownMenu(item: Item): string {
  return `
    <ul class="multilevel-dropdown-menu">
      <li class="parent"><a href="#">Order <span class="expand">▼</span></a>
        <ul class="child">
          ${generateDropdownItem("Glass", item)}
          ${generateDropdownItem("Can", item)}
          ${generateDropdownItem("Box", item)}
        </ul>
      </li>
    </ul>
  `;
}

function generateDropdownItem(type: string, item: Item): string {
  return `
    <li class="parent"><a href="#">${type} <span class="expand">»</span></a>
      <ul class="child">
        <li class="leaf" data-item="${type}" data-quantity="1" data-name="${sanitize(item.name)}"><a href="#">1</a></li>
        <li class="leaf" data-item="${type}" data-quantity="2" data-name="${sanitize(item.name)}"><a href="#">2</a></li>
        <li class="leaf" data-item="${type}" data-quantity="3" data-name="${sanitize(item.name)}"><a href="#">3</a></li>
      </ul>
    </li>
  `;
}

export function addDropdownEventListeners(): void {
  const leafItems = document.querySelectorAll(
    ".multilevel-dropdown-menu .leaf"
  );
  leafItems.forEach((leaf) => {
    leaf.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLElement;
      const itemType = target.getAttribute("data-item");
      const quantity = target.getAttribute("data-quantity");
      const itemName = target.getAttribute("data-name");
      if (itemType && quantity && itemName) {
        alert(`Item: ${itemName}, Type: ${itemType}, Quantity: ${quantity}`);
      }
    });
  });
}

export function initializeDropdownToggles(): void {
  const parentLinks = document.querySelectorAll(
    ".multilevel-dropdown-menu .parent > a"
  );
  parentLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const parent = link.parentElement;
      if (parent) {
        const childMenu = parent.querySelector(".child") as HTMLElement;
        if (childMenu) {
          childMenu.classList.toggle("show");
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeDropdownToggles();
});
