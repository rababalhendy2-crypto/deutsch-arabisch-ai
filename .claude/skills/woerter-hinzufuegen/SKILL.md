---
name: woerter-hinzufuegen
description: Neue deutsche Wörter mit arabischer Bedeutung und 10 übersetzten Beispielsätzen ins Wörterbuch von index.html eintragen. Verwenden, wenn Wörter hinzugefügt, ergänzt, korrigiert oder gelöscht werden sollen (z. B. "füge Haus hinzu", "neue Wörter", "أضف كلمة").
---

# Wörter zum Wörterbuch hinzufügen

Das Wörterbuch ist das Objekt `const words = { ... };` im `<script>`-Block von `index.html`.
Suche, Wortliste und Quiz lesen alle daraus – es gibt keine weitere Datei.

## Format eines Eintrags

```js
  "schlüssel": {
    meaning:"arabische Bedeutung / Synonym", level:"C1", examples:[
      ["Deutscher Beispielsatz.","الترجمة العربية."],
      // ... genau 10 Paare
    ]
  },
```

Regeln (werden von `npm run check` geprüft):

- **Schlüssel**: das Wort in Kleinbuchstaben, ohne Leerzeichen am Rand – genau so, wie
  `normalize()` die Eingabe umwandelt (`trim()` + `toLocaleLowerCase("de-DE")`). Umlaute und ß bleiben erhalten (`"maßgeblich"`).
- **meaning**: arabisch; mehrere Bedeutungen mit ` / ` trennen.
- **level**: eines von `A1 A2 B1 B2 C1 C2` (GER-Niveau des Wortes).
- **examples**: **genau 10** Paare `["Deutsch","Arabisch"]`, keine doppelten Sätze.
  Jeder deutsche Satz enthält das Wort (gebeugte Formen sind ok) und endet mit `.`, `!` oder `?`.
- Doppelte Anführungszeichen `"` im Text vermeiden; deutsche Anführungszeichen „…“ verwenden.

Inhaltliche Regeln (Ton, Übersetzungsstil, Niveau) stehen im Skill `inhaltsrichtlinien` – vor dem Schreiben lesen.

## Ablauf

1. Prüfen, ob der Schlüssel schon existiert (`grep -n '"wort":' index.html`). Wenn ja: ergänzen/korrigieren statt doppelt anlegen.
2. Eintrag am Ende des `words`-Objekts einfügen (vor der schließenden `};`), Einrückung wie die bestehenden Einträge, Komma zwischen Einträgen nicht vergessen.
3. `npm run check` ausführen – muss `OK` melden. Warnungen (z. B. Wort nicht im Satz gefunden) einzeln ansehen und beheben, wenn berechtigt.
4. `npm test` ausführen (Skill `app-testen`), um Suche und Quiz im Browser zu prüfen.
5. Commit-Nachricht nennt die hinzugefügten Wörter, z. B. `Wörterbuch: Haus, lernen hinzugefügt`.
