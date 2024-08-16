import { Item } from "@domain/Item";
import { sanitize } from "@utils/sanitize";
import {
  generateDropdownMenu,
  addDropdownEventListeners,
  initializeDropdownToggles,
} from "@components/dropdown/DropDown";
import "./modal.less";

export function openModal(item: Item): void {
  const modalElement = document.getElementById("modal");
  if (modalElement) {
    modalElement.innerHTML = `
      <div class="modal-content">
        <header class="modal-content__header">
          <span class="modal-content__header-close">&times;</span>
        </header>
        <div class="content-container">
          <div class="circle">
            <img src="${sanitize(item.image_url)}" alt="${sanitize(item.name)}" class="circle-image">
            <div class="info">
              <span>${sanitize(item.abv.toString())}%</span>
            </div>
          </div>
          <div class="description-container">
            <p class="description">${sanitize(item.description)}</p>
          </div>
        </div>
        <footer class="modal-content__footer">
          <div class="modal-content__footer-title">${sanitize(item.name)}</div>
          ${generateDropdownMenu(item)}
        </footer>
      </div>
    `;
    modalElement.style.display = "flex";

    const closeButton = modalElement.querySelector(
      ".modal-content__header-close"
    ) as HTMLElement;
    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    addDropdownEventListeners();
    initializeDropdownToggles();
  }
}

export function closeModal(): void {
  const modalElement = document.getElementById("modal");
  if (modalElement) {
    modalElement.style.display = "none";
  }
}
