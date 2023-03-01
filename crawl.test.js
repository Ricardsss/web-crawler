const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("normalizes an empty url string", () => {
  expect(normalizeURL("")).toBe("");
});

test("normalizes a url with a trailing slash", () => {
  expect(normalizeURL("https://thescore.com/fifa/")).toBe("thescore.com/fifa");
});

test("normalizes a url with some capital letters", () => {
  expect(normalizeURL("https://theScore.com/FIFA")).toBe("thescore.com/FIFA");
});

test("normalizes a url with https and a path", () => {
  expect(normalizeURL("https://thescore.com/fifa")).toBe("thescore.com/fifa");
});

test("normalizes a url with http protocol", () => {
  expect(normalizeURL("http://theScore.com/soccer/")).toBe(
    "thescore.com/soccer"
  );
});
