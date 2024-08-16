import { AllowedMethods } from "./httpMethods";

export async function fetchMockApi<T>(
  url: string,
  method: AllowedMethods = AllowedMethods.GET,
  token?: string
): Promise<T[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.record as T[];
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}
