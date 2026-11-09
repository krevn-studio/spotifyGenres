# Krevn Genres

Strumento open source di [Krevn Studio](https://github.com/xAspired): analizza i tuoi brani Spotify e li divide in cartelle per genere.

- Gira tutto nel browser: nessun server, nessun database.
- Non salva niente. Chiudi la pagina e sparisce tutto.

## Due modi d'uso

1. **Login Spotify (serve Premium).** Crei la tua app gratis su [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard), incolli il Redirect URI mostrato nella pagina e poi il Client ID. Il sito legge i tuoi top tracks e fino a 500 brani piaciuti. Puoi creare una playlist privata per ogni cartella.
2. **Export Spotify (senza Premium).** Carichi i JSON della cronologia di ascolto richiesti da spotify.com/account/privacy. I generi arrivano da MusicBrainz.

Spotify limita ogni app in Development Mode a 5 utenti e richiede Premium al proprietario: per questo ognuno usa la propria app.

## Deploy

Un solo file statico (`index.html`). Va bene qualsiasi hosting statico (GitHub Pages, Cloudflare Pages).

## Licenza

MIT
