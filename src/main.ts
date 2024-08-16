// main.ts
import { Card } from "./components/card/Card";
import { openModal, closeModal } from "./components/modal/Modal";
import { fetchMockApi } from "./services/fetchMockApi";
import { AllowedMethods } from "./services/httpMethods";
import { Item } from "./domain/Item";
import "./styles/style.less";

const API_URL = import.meta.env.VITE_API_URL as string;

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  closeModal();

  try {
    const items = await fetchMockApi<Item>(API_URL, AllowedMethods.GET);

    items.forEach((item) => {
      const card = Card(item);
      app?.appendChild(card);
    });

    //@ts-ignore
    document.addEventListener("cardClick", (event: CustomEvent) => {
      const { item } = event.detail;
      openModal(item);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  } catch (error) {
    console.error("Error loading items:", error);
  }
});
