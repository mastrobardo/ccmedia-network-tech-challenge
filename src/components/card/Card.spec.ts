import { Card } from "./Card";
import { Item } from "@domain/Item";
import { sanitize } from "@utils/sanitize";

// Mock sanitize function for testing
jest.mock("@utils/sanitize", () => ({
  sanitize: jest.fn((input: string) =>
    //@ts-ignore
    input.replace(/[&<>"']/g, (match: string) => {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[match];
    })
  ),
}));

// Mock Item object for testing
const mockItem: Item = {
  id: 1,
  name: "Test Beer",
  image_url: "https://example.com/image.jpg",
  abv: 5.0,
  ibu: 45,
  description: "",
};

describe("Card Component", () => {
  let cardElement: HTMLElement;

  beforeAll(() => {
    cardElement = Card(mockItem);
  });

  test("should create a card element", () => {
    expect(cardElement).toBeInstanceOf(HTMLElement);
  });

  test("should have the correct background color class based on IBU", () => {
    const bgColorClass = `bg4`;
    const ibuRectangle = cardElement.querySelector(".ibu-rectangle");
    expect(ibuRectangle).not.toBeNull();
    expect(ibuRectangle!.classList).toContain(bgColorClass);
  });

  test("should contain the correct item data", () => {
    const nameElement = cardElement.querySelector(".name");
    const imageElement = cardElement.querySelector(
      ".card-image"
    ) as HTMLImageElement;
    const ribbonElement = cardElement.querySelector(".ribbon span");
    const ibuElement = cardElement.querySelector(".ibu-rectangle span");

    expect(nameElement).not.toBeNull();
    expect(nameElement!.textContent).toBe(mockItem.name);

    expect(imageElement).not.toBeNull();
    expect(imageElement!.src).toBe(mockItem.image_url);

    expect(ribbonElement).not.toBeNull();
    expect(ribbonElement!.textContent).toBe(`${mockItem.abv}%`);

    expect(ibuElement).not.toBeNull();
    expect(ibuElement!.textContent).toBe(`IBU: ${mockItem.ibu}`);
  });

  test("should sanitize input data", () => {
    expect(sanitize).toHaveBeenCalledWith(mockItem.name);
    expect(sanitize).toHaveBeenCalledWith(`${mockItem.abv}%`);
    expect(sanitize).toHaveBeenCalledWith(mockItem.ibu.toString());
  });

  test("should dispatch a cardClick event when clicked", () => {
    const clickEvent = new Event("click");
    const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

    cardElement.dispatchEvent(clickEvent);

    expect(dispatchEventSpy).toHaveBeenCalled();
    const event = dispatchEventSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe("cardClick");
    expect(event.detail.item).toEqual(mockItem);
  });
});
