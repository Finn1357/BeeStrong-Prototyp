# Mein Honig – Präsentations-Website

Diese statische Website zeigt eine Präsentation meines Honigs. Der Honig wird auf der Seite nicht verkauft, sondern nur vorgestellt.

## Inhalt

- `index.html` – Hauptseite mit Label-Vorschau und Schritt-für-Schritt-Beschreibung der Herstellung
- `css/styles.css` – Styling (neues Design, Google Fonts, responsive Grid, Druckansicht)
- `js/scripts.js` – Kleine Interaktionen (Modal, Galerie)
- `assets/label.svg` – Etikett (zum Herunterladen und Anpassen)
- `assets/bees.svg`, `assets/jar.svg` – Illustrationen für die Galerie

## Hinweise und rechtliche Sicherheit
- Diese Website dient nur zu Präsentationszwecken: keine Verkaufsfunktion, keine Bestellmöglichkeit.
- Keine medizinische Beratung oder heilende Wirkung angeben.
- Warnhinweis: Honig nicht an Säuglinge unter 12 Monaten geben (Botulismus-Risiko).
- Für Fotos/Illustrationen: Verwende eigenproduzierte Fotos oder lizenzfreie Quellen (z. B. Unsplash, Pexels). Achte auf die Nutzungsrechte.

## Lokales Testen (Windows PowerShell)
1. Öffne die PowerShell im Projektordner (oder navigiere mit `cd`).
2. Wenn Python installiert ist, starte einen einfachen Server:

```powershell
py -3 -m http.server 5500; # öffnet http://localhost:5500
# oder
python -m http.server 5500; 
```

3. Öffne `http://localhost:5500` in Deinem Browser.

## Neue Features
- Gallery & Modal: Klick auf ein Bild öffnet eine größere Vorschau.
- Besseres Layout: Modernes Layout, Farben, Google Fonts und Druckoptimierungen.
- Accessibility: ARIA-Attribute, keyboard-friendly modal (Esc schließt).

### Barrierefreiheit & SEO

- ARIA-Attribute für Navigation und Modal sorgen für bessere Zugänglichkeit.
- `alt`-Texte für Bilder und `meta description` im HTML helfen beim SEO.

Wenn Du die Seite öffentlich machst, prüfe Bilder und Texte auf korrekte Rechte und Angaben.

## Label anpassen

- Das SVG `assets/label.svg` ist editierbar in einem Texteditor oder mit einem Vektorprogramm (z. B. Inkscape).
- Entferne die Zeile "Nur zur Präsentation" nur wenn Du die rechtliche Absicherung kennst und alle geltenden Kennzeichnungsregeln beachtest.

## Deployment

- Diese statische Seite kann einfach bei GitHub Pages, Netlify oder Vercel gehostet werden.
- Achte beim Hosten darauf, keine personenbezogenen Daten öffentlich zu machen.
