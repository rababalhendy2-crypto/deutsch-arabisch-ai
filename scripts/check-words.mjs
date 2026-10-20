// Prüft das Wörterbuch in index.html: Syntax des Skripts und Format jedes Eintrags.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) fail(["Kein <script>-Block in index.html gefunden."]);

try {
  new vm.Script(script);
} catch (err) {
  fail([`Syntaxfehler im Skript: ${err.message}`]);
}

const block = script.match(/const words = (\{[\s\S]*?\n\});/)?.[1];
if (!block) fail(["`const words = {...};` nicht gefunden."]);
const words = vm.runInNewContext(`(${block})`);

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const ARABIC = /[؀-ۿ]/;
const errors = [];
const warnings = [];

for (const [key, item] of Object.entries(words)) {
  const where = `„${key}“`;
  if (key !== key.trim().toLocaleLowerCase("de-DE")) errors.push(`${where}: Schlüssel muss klein geschrieben und ohne Leerzeichen am Rand sein.`);
  if (typeof item.meaning !== "string" || !ARABIC.test(item.meaning)) errors.push(`${where}: \`meaning\` muss ein arabischer Text sein.`);
  if (!LEVELS.includes(item.level)) errors.push(`${where}: \`level\` muss eines von ${LEVELS.join(", ")} sein.`);
  if (!Array.isArray(item.examples) || item.examples.length !== 10) {
    errors.push(`${where}: Genau 10 Beispiele erforderlich (gefunden: ${item.examples?.length ?? 0}).`);
    continue;
  }
  const seen = new Set();
  item.examples.forEach((ex, i) => {
    const n = `${where} Beispiel ${i + 1}`;
    if (!Array.isArray(ex) || ex.length !== 2 || ex.some(s => typeof s !== "string" || !s.trim())) {
      errors.push(`${n}: muss ["Deutsch", "Arabisch"] sein.`);
      return;
    }
    const [de, ar] = ex;
    if (ARABIC.test(de)) errors.push(`${n}: deutscher Satz enthält arabische Zeichen.`);
    if (!ARABIC.test(ar)) errors.push(`${n}: Übersetzung ist nicht arabisch.`);
    if (!/[.!?]$/.test(de.trim())) warnings.push(`${n}: deutscher Satz endet ohne Satzzeichen.`);
    if (seen.has(de)) errors.push(`${n}: doppelter Beispielsatz.`);
    seen.add(de);
    const stem = key.slice(0, Math.max(4, key.length - 3));
    if (!de.toLocaleLowerCase("de-DE").includes(stem)) warnings.push(`${n}: enthält das Wort (Stamm „${stem}“) offenbar nicht.`);
  });
}

warnings.forEach(w => console.warn(`Warnung: ${w}`));
if (errors.length) fail(errors);
console.log(`OK: ${Object.keys(words).length} Wörter geprüft, ${warnings.length} Warnung(en).`);

function fail(list) {
  list.forEach(e => console.error(`Fehler: ${e}`));
  process.exit(1);
}
