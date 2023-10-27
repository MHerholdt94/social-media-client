import { logout } from "./logout.js";

global.localStorage = {
  removeItem: jest.fn(),
};

describe("logout function", () => {
  it("should clear token from browser storage", () => {
    logout();

    expect(global.localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(global.localStorage.removeItem).toHaveBeenNthCalledWith(1, "token");
    expect(global.localStorage.removeItem).toHaveBeenNthCalledWith(
      2,
      "profile",
    );
  });
});
