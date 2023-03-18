const puppeteer = require("puppeteer");
const axios = require("axios");
(async () => {
  const query = "pc games";
  const apiKey =
    "1e16c54130360877eca9090f23c3a34ee7e84d11d3b212de23f11d4b696b14c0";
  const url = `https://serpapi.com/search?engine=duckduckgo&q=${query}&api_key=${apiKey}`;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  const results = await page.evaluate(() => {
    const resultElements = document.querySelectorAll(".result__body");
    const results = [];
    resultElements.forEach((result) => {
      const title = result.querySelector(".result__title").innerText;
      const snippet = result.querySelector(".result__snippet").innerText;
      results.push({ title, snippet });
    });
    return results;
  });
  console.log("Search Results:");
  results.forEach((result) => {
    console.log(`- ${result.title}: ${result.snippet}`);
  });
  await new Promise(() => {});
})();
