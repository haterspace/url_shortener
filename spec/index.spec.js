const app = require("../server");
const { generateRandomString, generateShortUrl } = require('../middlewares')
const request = require("supertest"); 

describe("generateRandomString", () => {
  test("it generates a string of specified length", () => {
    const length = 4;
    const randomString = generateRandomString(length);
    expect(randomString.length).toBe(length);
  });
});

describe("generateShortUrl", () => {
  test("it generates a short URL with the correct prefix", () => {
    const shortUrl = generateShortUrl();
    expect(shortUrl.startsWith("")).toBe(true);
  });
});

describe("URL Shortener API", () => {
  test("it should create a short URL for a valid long URL", async () => {
    const response = await request(app)
      .post("/shortUrls")
      .send({ longUrl: "https://google.com" })

    expect(response.status).toBe(302);
  });

  test("it should return 400 for an invalid long URL", async () => {
    const response = await request(app)
      .post("/shortUrls")
      .send({ longUrl: "invalid-url" });

    expect(response.status).toBe(400);
  });
});
