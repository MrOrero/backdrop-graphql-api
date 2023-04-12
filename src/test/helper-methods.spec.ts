import { toSentenceCase } from "../util/helper-methods"; // Replace with the correct path to your file

describe("toSentenceCase", () => {
    it("should capitalize the first letter of each word and convert the rest to lowercase", () => {
        expect(toSentenceCase("hello world")).toEqual("Hello World");
        expect(toSentenceCase("jOHN dOE")).toEqual("John Doe");
        expect(toSentenceCase("aBc DEf")).toEqual("Abc Def");
        expect(toSentenceCase("")).toEqual("");
    });

    it("should handle white spaces correctly", () => {
        expect(toSentenceCase(" hello  world ")).toEqual("Hello World");
    });
});
