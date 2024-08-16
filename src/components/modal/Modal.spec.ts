import { openModal, closeModal } from "./Modal";
import { Item } from "@domain/Item";
import { sanitize } from "@utils/sanitize";
import {
  generateDropdownMenu,
  addDropdownEventListeners,
  initializeDropdownToggles,
} from "@components/dropdown/DropDown";

jest.mock("@utils/sanitize", () => ({
  sanitize: jest.fn((input: string) => input),
}));

jest.mock("@components/dropdown/DropDown", () => ({
  generateDropdownMenu: jest.fn(
    () => `<div class="dropdown-menu">Mocked Dropdown</div>`
  ),
  addDropdownEventListeners: jest.fn(),
  initializeDropdownToggles: jest.fn(),
}));

describe("Modal Functions", () => {
  let mockItem: Item;
  let modalElement: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '<div id="modal"></div>';
    modalElement = document.getElementById("modal")!;

    mockItem = {
      id: 1,
      name: "Test Item",
      image_url: "https://example.com/image.jpg",
      abv: 5.0,
      ibu: 45,
      description: "This is a test description",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("openModal should populate and display the modal", () => {
    openModal(mockItem);

    expect(modalElement.style.display).toBe("flex");
    expect(modalElement.innerHTML).toContain("Test Item");
    expect(modalElement.innerHTML).toContain("This is a test description");
    expect(sanitize).toHaveBeenCalledWith(mockItem.image_url);
    expect(sanitize).toHaveBeenCalledWith(mockItem.name);
    expect(sanitize).toHaveBeenCalledWith(mockItem.abv.toString());
    expect(sanitize).toHaveBeenCalledWith(mockItem.description);
    expect(generateDropdownMenu).toHaveBeenCalledWith(mockItem);
    expect(addDropdownEventListeners).toHaveBeenCalledWith(mockItem);
    expect(initializeDropdownToggles).toHaveBeenCalled();

    const closeButton = modalElement.querySelector(
      ".modal-content__header-close"
    ) as HTMLElement;
    expect(closeButton).not.toBeNull();
    closeButton.click();
    expect(modalElement.style.display).toBe("none");
  });

  test("closeModal should hide the modal", () => {
    openModal(mockItem);
    closeModal();
    expect(modalElement.style.display).toBe("none");
  });
});
