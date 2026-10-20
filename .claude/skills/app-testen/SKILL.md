---
name: app-testen
description: Die Deutsch-Arabisch-App prüfen und testen – Wörterbuch-Format validieren und index.html in Chromium (Desktop und Mobil) durchklicken. Verwenden nach jeder Änderung an index.html, vor Commits, oder wenn die App gestartet, getestet oder per Screenshot gezeigt werden soll.
---

# App prüfen & testen

Die App ist eine einzelne statische Datei (`index.html`) ohne Build und ohne Server; sie funktioniert offline.

## Befehle

| Befehl | Was er tut |
|---|---|
| `npm run check` | Skript-Syntax prüfen und jeden Wörterbuch-Eintrag validieren (`scripts/check-words.mjs`). Schnell, ohne Browser. |
| `npm test` | `check` + Browser-Smoke-Test (`scripts/smoke-test.mjs`). |

Voraussetzung: `npm install` (in Cloud-Sitzungen erledigt das der SessionStart-Hook automatisch).
Der Smoke-Test nutzt Playwright mit dem vorinstallierten Chromium; falls Playwright keinen Browser findet,
`CHROMIUM_PATH=/opt/pw-browsers/chromium npm test` setzen. Nie `playwright install` ausführen.

## Was der Smoke-Test prüft (Desktop 1280 px und Mobil 375 px)

- `<html dir="rtl">` ist gesetzt.
- Suche findet ein Wort auch mit Großbuchstaben und Leerzeichen und zeigt 10 Beispiele.
- Unbekanntes Wort → Fehlermeldung; Enter-Taste löst die Suche aus.
- Auswahl aus der Wortliste übernimmt das Wort.
- Quiz akzeptiert die richtige und lehnt eine falsche Antwort ab.
- Kein horizontales Scrollen, keine JavaScript-Fehler in der Konsole.

Screenshots landen in `screenshots/desktop.png` und `screenshots/mobil.png` (nicht eingecheckt). Bei
Layout-Änderungen die Screenshots ansehen (Read-Tool) und auf RTL-Ausrichtung, abgeschnittene Texte und
Lesbarkeit der deutschen LTR-Sätze achten.

## Neue Funktionen

Wenn eine neue Funktion in `index.html` dazukommt, im selben Commit einen passenden Check in
`scripts/smoke-test.mjs` ergänzen (gleiches Muster: `check(bedingung, "${name}: Meldung")`).
Einen fehlschlagenden Check nie entfernen, um grün zu werden – die Ursache beheben.
