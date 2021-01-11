import capitalizeFirstLetter from "../capitalizeFirstLetter"

it("Capitalizes first letter of a word", () => {
  const word = capitalizeFirstLetter("hello")
  expect(word).toBe("Hello")
})
