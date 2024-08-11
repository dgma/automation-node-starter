import { example } from "@src/example";

describe("example", () => {
  it("should log hello world", () => {
    expect(example()).toBe("Hello world");
  });
});
