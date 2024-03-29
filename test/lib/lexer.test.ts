import { Token, lexer } from "@root/lib/lexer";

describe("./lib/lexer", () => {
  it("test class: new Token()", async () => {
    // Arrange
    const result = new Token("LO", "&&", 1, 5);
    // Assert
    expect(result.type).toBe("LO");
    expect(result.value).toBe("&&");
    expect(result.start).toBe(1);
    expect(result.end).toBe(5);
  });

  it('test fun: lexer("var a = 1")', async () => {
    const testStr = "var a = 1";

    const result = lexer(testStr, [
      { type: "VAR", code: ["var"] },
      { type: "WS", code: [" "] },
      { type: "CO", code: ["="] },
    ]);

    const aTokens = [
      { type: "VAR", value: "var", start: 0, end: 3 },
      { type: "WS", value: " ", start: 3, end: 4 },
      { type: "TEXT", value: "a", start: 4, end: 5 },
      { type: "WS", value: " ", start: 5, end: 6 },
      { type: "CO", value: "=", start: 6, end: 7 },
      { type: "WS", value: " ", start: 7, end: 8 },
      { type: "TEXT", value: "1", start: 8, end: 9 },
    ];

    result.forEach((token, index) => {
      const a = aTokens[index];
      expect(token.type).toBe(a.type);
      expect(token.value).toBe(a.value);
      expect(token.start).toBe(a.start);
      expect(token.end).toBe(a.end);
    });
  });
});
