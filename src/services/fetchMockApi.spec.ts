import { fetchMockApi } from "./fetchMockApi";
import { AllowedMethods } from "./httpMethods";

global.fetch = jest.fn();

describe("fetchMockApi", () => {
  const mockData = { record: [{ id: 1, name: "Test" }] };
  const url = "https://example.com/api";
  //   const token = "mockToken";

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("should fetch data successfully with GET method and no token", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchMockApi(url);
    expect(result).toEqual(mockData.record);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: AllowedMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("should throw an error if the fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchMockApi(url)).rejects.toThrow("HTTP error! status: 500");
    expect(fetch).toHaveBeenCalledWith(url, {
      method: AllowedMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("should throw an error if the fetch throws an error", async () => {
    const errorMessage = "Network error";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchMockApi(url)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: AllowedMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
