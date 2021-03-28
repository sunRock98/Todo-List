import { renderHook } from "@testing-library/react-hooks";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should put serialized data to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("foo"));

    result.current.write([1, 2, 3]);
    expect(localStorage.getItem("foo")).toEqual("[1,2,3]");
  });

  it("should read from localStorage and return unserialized data", () => {
    const { result } = renderHook(() => useLocalStorage("foo"));

    localStorage.setItem("foo", "[2,3,5]");
    expect(result.current.read()).toEqual([2, 3, 5]);
  });

  it("should return null if no data was available", () => {
    const { result } = renderHook(() => useLocalStorage("foo"));
    expect(result.current.read()).toEqual(null);
  });
});
