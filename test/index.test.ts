import { Token, lexer } from "@root/index";

describe("./index", () => {
  it("Check out export", async () => {
    // Assert
    expect(Token).toBeDefined();
    expect(lexer).toBeDefined();
  });
});
