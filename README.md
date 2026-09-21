# Goodreads – bokapp

En webbapp för att hantera en lista med böcker: lägga till, markera som läst,
betygsätta och radera. Byggd med vanilla JavaScript, Firebase Realtime Database (REST API)
och OOP.

## Funktionalitet

- Lägg till en bok med titel och författare via ett formulär
- Se alla böcker i listan, med titel, författare och läststatus
- Markera en bok som läst/oläst
- Betygsätt en bok (1–10), endast tillgängligt för lästa böcker
- Ta bort en bok från listan

## Teknik

- **Vanilla JavaScript** (ES-moduler)
- **Firebase Realtime Database**, via REST API (`fetch`, inget SDK)
- **Vite** för bundling
- **Netlify** för deploy

## Tredjeparts-API

Bokomslag hämtas från [Open Library](https://openlibrary.org/dev/docs/api/covers):

1. En sökning görs mot `openlibrary.org/search.json` baserat på titel och författare.
2. Om ett cover-ID (`cover_i`) hittas i träffen, byggs en bild-URL mot
   `covers.openlibrary.org/b/id/{cover_i}-M.jpg`.
3. Om inget omslag hittas visas en textfallback istället för en trasig bild.
