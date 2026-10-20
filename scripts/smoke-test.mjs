// Öffnet index.html in Chromium und prüft Suche, Wortliste und Quiz (Desktop + Mobil).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = new URL("../index.html", import.meta.url).href;
const shots = new URL("../screenshots/", import.meta.url);
mkdirSync(shots, { recursive: true });

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

for (const [name, viewport] of [["desktop", { width: 1280, height: 900 }], ["mobil", { width: 375, height: 800 }]]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(url);

  check(await page.getAttribute("html", "dir") === "rtl", `${name}: <html dir="rtl"> fehlt.`);

  const firstKey = await page.$eval("#wordList option:nth-child(2)", o => o.value);
  await page.fill("#search", "  " + firstKey.toUpperCase() + " ");
  await page.click("#searchBtn");
  check(await page.locator("#result .example").count() === 10, `${name}: Suche nach „${firstKey}“ zeigt nicht 10 Beispiele.`);

  await page.fill("#search", "gibtesnicht");
  await page.press("#search", "Enter");
  check(await page.locator("#result .status.bad").count() === 1, `${name}: unbekanntes Wort zeigt keine Fehlermeldung.`);

  await page.selectOption("#wordList", firstKey);
  await page.click("#openSelected");
  check(await page.inputValue("#search") === firstKey, `${name}: Wortliste übernimmt das Wort nicht ins Suchfeld.`);

  const answer = await page.evaluate(() => currentQuiz[0]);
  await page.fill("#quizAnswer", answer);
  await page.click("#checkBtn");
  check(await page.locator("#quizStatus .status.ok").count() === 1, `${name}: richtige Quiz-Antwort wird nicht akzeptiert.`);
  await page.fill("#quizAnswer", "falsch");
  await page.click("#checkBtn");
  check(await page.locator("#quizStatus .status.bad").count() === 1, `${name}: falsche Quiz-Antwort wird nicht erkannt.`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check(!overflow, `${name}: horizontales Scrollen – Layout zu breit.`);
  check(errors.length === 0, `${name}: JavaScript-Fehler: ${errors.join(" | ")}`);

  await page.screenshot({ path: new URL(`${name}.png`, shots).pathname, fullPage: true });
  await page.close();
}
await browser.close();

if (failures.length) {
  failures.forEach(f => console.error(`Fehler: ${f}`));
  process.exit(1);
}
console.log("OK: Smoke-Test bestanden (Desktop + Mobil). Screenshots in screenshots/.");
