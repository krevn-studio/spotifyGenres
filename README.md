# Krevn Genres

Strumento open source di [Krevn Studio](https://github.com/krevn-studio): prende i tuoi brani Spotify preferiti, **ascolta un'anteprima di ognuno** e li divide in cartelle per **mood**.

- Gira tutto nel browser: nessun server, nessun database.
- Non salva niente. Chiudi la pagina e sparisce tutto.

## Cartelle

`Lonely` · `Golden hour` · `Feel good` · `Party` · `Dark` · `Sfogo` (+ `Senza anteprima` per i brani non trovati).

Ogni brano riceve cinque punteggi (felice, triste, calmo, aggressivo, ballabile). I punteggi vengono normalizzati rispetto alla tua libreria e ogni brano va nel mood più vicino. Puoi spostare i brani a mano e creare una playlist privata per cartella.

## Come funziona

1. **Lista brani**: login Spotify con la tua app (OAuth PKCE, serve Premium) oppure upload dell'export della cronologia (senza Premium).
2. **Audio**: anteprima di 30 secondi dalla iTunes Search API.
3. **Analisi**: modelli MusiCNN di mood di [Essentia](https://essentia.upf.edu) eseguiti con [Essentia.js](https://github.com/MTG/essentia.js) e TensorFlow.js in un Web Worker.

La prima volta il browser scarica circa 20 MB di modelli. L'analisi richiede circa 2-3 secondi per brano.

Spotify limita ogni app in Development Mode a 5 utenti e richiede Premium al proprietario: per questo ognuno usa la propria app.

## Deploy

Sito statico: `index.html`, `lib/`, `models/`, `_headers`. Va bene qualsiasi hosting statico (Cloudflare Pages, GitHub Pages).

## Licenze

- Codice: **AGPL-3.0** (vedi `LICENSE`), perché include Essentia.js.
- Modelli in `models/`: © Music Technology Group, Universitat Pompeu Fabra, **CC BY-NC-ND 4.0** (vedi `models/LICENSE`). **Solo uso non commerciale.**
- TensorFlow.js: Apache-2.0.
