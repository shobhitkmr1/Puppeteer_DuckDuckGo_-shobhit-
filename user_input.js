const puppeteer = require("puppeteer");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter a search query: ", async (query) => {
  const apiKey =
    "1e16c54130360877eca9090f23c3a34ee7e84d11d3b212de23f11d4b696b14c0";
  const url = `https://serpapi.com/search?engine=duckduckgo&q=${query}&api_key=${apiKey}`;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.goto(url);
  } catch (error) {
    console.error(`Error navigating to ${url}: ${error}`);
    await browser.close();
    rl.close();
    return;
  }
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
  results.forEach(({ title, snippet }) => {
    console.log(`- ${title}: ${snippet}`);
  });
  await new Promise(() => {});
  rl.close();
});
