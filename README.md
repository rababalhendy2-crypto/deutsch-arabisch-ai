# deutsch-arabisch-ai
German learning app for Arabic speakers

## Entwicklung

```bash
npm install     # Playwright für den Browser-Test
npm run check   # Wörterbuch-Format prüfen
npm test        # Check + Smoke-Test in Chromium (Desktop + Mobil)
```

Agent Skills für Claude Code liegen in `.claude/skills/`:
`woerter-hinzufuegen`, `inhaltsrichtlinien`, `app-testen`.
Ein SessionStart-Hook (`.claude/hooks/session-start.sh`) richtet Cloud-Sitzungen automatisch ein.
