import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import fetchPets from "@/services/fetchPets";
import { Utils } from "@/helpers/Utils";
import { info } from "@/helpers/info";
import { Pet } from "@/types/Pet";

vi.mock("@/helpers/Utils", () => {
  return {
    Utils: vi.fn().mockImplementation(() => ({
      getLocalStorage: vi.fn(),
      setLocalStorage: vi.fn(),
      formatPetsData: vi.fn((data) => data),
    })),
  };
});

describe("fetchPets", () => {
  const mockGetLocalStorage = vi.fn();
  const mockSetLocalStorage = vi.fn();
  const mockFormatPetsData = vi.fn((data) => data);

  const catsMockData: Pet[] = [
    {
      id: "1",
      url: "cat.jpg",
      species: "cat",
      name: "Whiskers",
      age: 2,
      isFavorite: false,
      height: 0,
      width: 0,
    },
  ];
  const dogsMockData: Pet[] = [
    {
      id: "2",
      url: "dog.jpg",
      species: "dog",
      name: "Buddy",
      age: 5,
      isFavorite: false,
      height: 0,
      width: 0,
    },
  ];

  beforeAll(() => {
    Utils.prototype.getLocalStorage = mockGetLocalStorage;
    Utils.prototype.setLocalStorage = mockSetLocalStorage;
    Utils.prototype.formatPetsData = mockFormatPetsData;

    global.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = input.toString();
      if (url === info.CAT_API_URL) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(catsMockData),
        } as Response);
      }
      if (url === info.DOG_API_URL) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(dogsMockData),
        } as Response);
      }
      return Promise.reject(new Error("Unknown URL"));
    }) as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns data from local storage if available", async () => {
    mockGetLocalStorage.mockReturnValue([...catsMockData, ...dogsMockData]);

    const result = await fetchPets();

    expect(result).toEqual([...catsMockData, ...dogsMockData]);
  });

  it("fetches data from APIs if local storage is empty", async () => {
    mockGetLocalStorage.mockReturnValue(null);
    mockFormatPetsData.mockImplementation((pets) => [...pets]);

    const result = await fetchPets();

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(info.CAT_API_URL, {
      headers: { "x-api-key": info.CAT_API_KEY },
    });
    expect(global.fetch).toHaveBeenCalledWith(info.DOG_API_URL, {
      headers: { "x-api-key": info.DOG_API_KEY },
    });
    expect(result).toEqual([...catsMockData, ...dogsMockData]);
  });

  it("throws an error if any API request fails", async () => {
    mockGetLocalStorage.mockReturnValue(null);

    (global.fetch as any).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    await expect(fetchPets()).rejects.toThrow("Failed to fetch");
  });
});
