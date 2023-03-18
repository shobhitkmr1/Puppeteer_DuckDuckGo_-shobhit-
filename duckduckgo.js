const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
app.get("/", async (req, res) => {
  const query = req.query.q;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://duckduckgo.com/?q=${query}&t=h_&ia=web`);
  const results = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a.result__url"));
    return links.map((link) => ({
      title: link.innerText,
      url: link.href,
    }));
  });
  await new Promise(() => {});
  res.json(results);
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
