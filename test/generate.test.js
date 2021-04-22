const generateCard = require("../lib/generateCard");
const { validate } = require("../lib/luhn");
describe("Card Generation", () => {

  test("generate valid card without any option", () => {
      const result = generateCard();
      expect(validate(result)).toBe(true);
  });

  describe("Starts With", () => {
    test("generate valid card with valid startsWith", () => {
        const result = generateCard({ startsWith: "5399" })
        expect(validate(result)).toBe(true);
        expect(result.startsWith("5399")).toBe(true);
    })

    test("throws with invalid startsWith", () => {
        expect(() => generateCard({ startsWith: ""})).toThrow("startsWith must consist of between 1 and 10 digits")
        expect(() => generateCard({ startsWith: "12345678910"})).toThrow("startsWith must consist of between 1 and 10 digits")
        expect(() => generateCard({ startsWith: "abcd"})).toThrow("startsWith must consist of digits only")
    })
  });

  describe("Ends With", () => {
    test("generate valid card with valid endsWith", () => {
        const result = generateCard({ endsWith: "5399" })
        expect(validate(result)).toBe(true);
        expect(result.endsWith("5399")).toBe(true);
    })

    test("throws with invalid endsWith", () => {
        expect(() => generateCard({ endsWith: ""})).toThrow("endsWith must consist of between 1 and 10 digits")
        expect(() => generateCard({ endsWith: "12345678910"})).toThrow("endsWith must consist of between 1 and 10 digits")
        expect(() => generateCard({ endsWith: "abcd"})).toThrow("endsWith must consist of digits only")
    })
  });

  describe("Ends With", () => {
    test("generate valid card with valid endsWith", () => {
        const result = generateCard({ endsWith: "5399" })
        expect(validate(result)).toBe(true);
        expect(result.endsWith("5399")).toBe(true);
    })

    test("throws with invalid endsWith", () => {
        expect(() => generateCard({ endsWith: ""})).toThrow("endsWith must consist of between 1 and 10 digits")
        expect(() => generateCard({ endsWith: "12345678910"})).toThrow("endsWith must consist of between 1 and 10 digits")
        expect(() => generateCard({ endsWith: "abcd"})).toThrow("endsWith must consist of digits only")
    })
  });

  describe("Include Sequence", () => {
    test("generate valid card with include sequence", () => {
        const result = generateCard({ includeSequence: "8766" })
        expect(validate(result)).toBe(true);
        expect(result.includes("8766")).toBe(true);
    })

    test("throws with invalid include sequence", () => {
        expect(() => generateCard({ includeSequence: ""})).toThrow("includeSequence must consist of between 1 and 10 digits")
        expect(() => generateCard({ includeSequence: "12345678910"})).toThrow("includeSequence must consist of between 1 and 10 digits")
        expect(() => generateCard({ includeSequence: "abcd"})).toThrow("includeSequence must consist of digits only")
    })
  });

  describe("Network and Issuer", () => {
      test("generate valid card when only network is supplied", () => {
          const result = generateCard({ network: "mastercard" });
          expect(validate(result)).toBe(true);
          expect(result.startsWith("5"));
      })

      test("generate valid card when network and issuer are supplied", () => {
          const result = generateCard({network: "mastercard", issuer: "001"});
          expect(validate(result)).toBe(true);
          expect(result.startsWith("5547"));
      })
  })
});
