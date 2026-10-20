---
name: inhaltsrichtlinien
description: Sprach- und Stilregeln für alle Inhalte der Deutsch-Arabisch-App (Oberflächentexte, Bedeutungen, Beispielsätze, Übersetzungen). Verwenden, bevor Texte in index.html geschrieben oder geändert werden oder wenn Übersetzungen geprüft werden sollen.
---

# Inhaltsrichtlinien

Zielgruppe: arabischsprachige Lernerinnen, die Deutsch lernen. Die Oberfläche ist arabisch (`lang="ar" dir="rtl"`), deutsche Inhalte werden links-nach-rechts angezeigt.

## Oberflächentexte (Arabisch)

- Die Nutzerin wird **in der weiblichen Form** angesprochen: `اكتبي`، `اختاري`، `تحققي`، `أحسنتِ`. Neue Buttons, Hinweise und Fehlermeldungen genauso formulieren.
- Modernes Hocharabisch (فصحى), freundlich und kurz. Keine Dialektwörter.
- Arabische Satzzeichen verwenden: `،` `؟` und Anführungszeichen `«…»`.
- Deutsche Wörter innerhalb arabischer Texte in ein Element mit `dir="ltr"` setzen (wie `<b dir="ltr">` im Quiz), damit die Richtung stimmt.

## Bedeutungen (`meaning`)

- Die gebräuchlichste Bedeutung zuerst, Synonyme oder Nuancen danach, getrennt durch ` / `.
- Kurz halten (max. ca. 6 Wörter) – die Bedeutung erscheint auch als Quizfrage und in der Wortliste.
- Keine deutschen Wörter oder Erklärungen in Klammern; das Arabische soll für sich stehen.

## Beispielsätze

- Deutsch: grammatisch korrekt, natürlich, alltags- oder berufsnah; neue Rechtschreibung.
- Das Niveau der Sätze passt zum `level` des Wortes. Bisher sind alle Wörter **C1** (Bildungs-/Berufssprache); neue Wörter nur mit anderem Niveau anlegen, wenn ausdrücklich gewünscht.
- Die 10 Sätze zeigen **verschiedene Verwendungen**: unterschiedliche Satzstellungen, gebeugte Formen, typische Kollokationen (z. B. „maßgeblich beteiligt“, „differenziert betrachten“). Keine 10 Varianten desselben Satzes.
- Arabisch: sinngemäß und idiomatisch übersetzen, nicht Wort für Wort. Sätze mit „Sie“ (Höflichkeitsform) ins Arabische höflich und neutral übertragen (z. B. `يرجى …`).
- Tanwin/Hamza korrekt setzen (`متذبذبًا`، `ضروري`); Tashkeel nur dort, wo es Missverständnisse verhindert.
- Keine politischen, religiösen oder anstößigen Inhalte, keine echten Personen oder Marken.

## Prüfen

Formale Regeln prüft `npm run check`. Inhaltliche Regeln selbst gegenlesen: bei jedem neuen Eintrag alle 10 Paare einmal laut „hin und zurück“ übersetzen und auf Bedeutungsgleichheit prüfen.
