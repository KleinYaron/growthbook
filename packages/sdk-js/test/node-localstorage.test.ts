/** @jest-environment node */

describe("Node localStorage detection", () => {
  it("does not read the global localStorage getter", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "localStorage",
    );
    const localStorageGetter = jest.fn(() => undefined);

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get: localStorageGetter,
    });

    try {
      jest.isolateModules(() => {
        require("../src/feature-repository");
      });
      expect(localStorageGetter).not.toHaveBeenCalled();
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(globalThis, "localStorage", originalDescriptor);
      } else {
        delete (globalThis as { localStorage?: unknown }).localStorage;
      }
    }
  });
});
