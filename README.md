<div align="center">

# Vibely for Spotify

**Ascolta le tue canzoni preferite e le divide per mood, non per genere.**

[**Prova il sito →**](https://krevn-spotify-organizer.pages.dev/)

![License](https://img.shields.io/badge/code-AGPL--3.0-9DB07C)
![Models](https://img.shields.io/badge/models-CC%20BY--NC--ND%204.0-A2AE9C)
![Backend](https://img.shields.io/badge/backend-none-EFE2C4)
![Storage](https://img.shields.io/badge/data%20saved-zero-0E241B)

[Krevn Studio](https://github.com/krevn-studio)

</div>

---

## Cos'è

I generi musicali dicono poco su come ti senti. Un brano rap e uno indie possono stare bene nella stessa playlist, se hanno lo stesso umore.

Vibely scarica le tue canzoni piaciute, **ascolta un'anteprima di 30 secondi di ognuna** con modelli di machine learning e le sistema in cartelle per mood:

| Cartella | Mood |
|---|---|
| **Lonely** | Malinconiche, introspettive, da cuffie e finestrino |
| **Golden hour** | Calde, sognanti, emotive ma luminose |
| **Feel good** | Positive e leggere, mettono di buon umore |
| **Party** | Ritmo alto, da ballare |
| **Dark** | Cupe e tese, malinconia con grinta |
| **Sfogo** | Aggressive, per scaricare la tensione |
| *Senza anteprima* | Brani di cui non è stata trovata un'anteprima audio |

Puoi spostare i brani a mano da una cartella all'altra e creare una **playlist privata** su Spotify per ogni cartella.

## Privacy

- Tutto gira **nel tuo browser**. Non c'è nessun server e nessun database.
- **Non viene salvato niente.** Chiudi la pagina e sparisce tutto.
- Il login usa OAuth 2.0 con PKCE, direttamente tra il tuo browser e Spotify.
- Il tuo Client ID resta in `sessionStorage` solo durante il redirect.

## Come funziona

```
Spotify (brani piaciuti)
   │
   ▼
iTunes Search API ──► anteprima audio 30 s
   │
   ▼
Web Worker: Essentia.js + TensorFlow.js (MusiCNN)
   │   happy · sad · relaxed · aggressive · danceability
   ▼
Punteggi normalizzati sulla tua libreria
   │
   ▼
Mood più vicino ──► cartelle ──► (opzionale) playlist Spotify
```

1. **Brani**: tutta la libreria dei preferiti, senza duplicati.
2. **Audio**: anteprima di 30 secondi dalla iTunes Search API, decodificata a 16 kHz mono.
3. **Analisi**: cinque modelli MusiCNN di [Essentia](https://essentia.upf.edu), eseguiti con [Essentia.js](https://github.com/MTG/essentia.js) in un Web Worker.
4. **Mood**: ogni punteggio è confrontato con il resto della tua libreria (z-score), poi il brano va nel mood più vicino.

La prima volta il browser scarica circa 20 MB di modelli. L'analisi richiede circa 2-3 secondi per brano.

## Usarlo

Spotify limita ogni app in Development Mode a 5 utenti e richiede Premium al proprietario. Per questo **ognuno usa la propria app**:

1. Vai su [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) e crea un'app.
2. Aggiungi tra i **Redirect URIs** l'indirizzo del sito, con la barra finale:
   `https://krevn-spotify-organizer.pages.dev/`
3. Copia il **Client ID**.
4. Apri il sito, incolla il Client ID e accedi.

Permessi richiesti: `user-library-read`, `playlist-modify-private`, `playlist-modify-public`.

## Eseguirlo in locale

Sito statico, nessuna build.

```bash
git clone https://github.com/krevn-studio/spotifyGenres.git
cd spotifyGenres
python3 -m http.server 8080
```

Poi apri `http://127.0.0.1:8080/` e registra quell'indirizzo come Redirect URI nella tua app Spotify.

## Deploy

Basta un hosting statico (Cloudflare Pages, GitHub Pages, Netlify). Servono `index.html`, `lib/`, `models/` e `_headers`.

## Struttura

```
index.html          interfaccia, login PKCE, API Spotify, classificazione
lib/mood-worker.js  analisi audio nel Web Worker
lib/                TensorFlow.js, Essentia.js e WASM
models/             modelli MusiCNN
_headers            cache per modelli e librerie
```

## Contribuire

Issue e pull request sono benvenute. Idee utili:

- affinare i prototipi dei mood (`MOODS` in `index.html`)
- altre fonti di anteprima oltre a iTunes
- più lingue

## Licenze

- **Codice**: [AGPL-3.0](LICENSE), perché include Essentia.js.
- **Modelli** in `models/`: © Music Technology Group, Universitat Pompeu Fabra, [CC BY-NC-ND 4.0](models/LICENSE). **Solo uso non commerciale.**
- **TensorFlow.js**: Apache-2.0.

Vibely non è affiliato a Spotify AB. Spotify è un marchio di Spotify AB.

---

<div align="center">

Fatto da [Krevn Studio](https://github.com/krevn-studio)

</div>
