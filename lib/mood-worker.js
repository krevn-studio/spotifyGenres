/*
 * Mood worker: runs Essentia.js MusiCNN mood classifiers on 16 kHz mono audio.
 * Models: MTG-UPF, CC BY-NC-ND 4.0 (see /models/LICENSE). Essentia.js: AGPL-3.0.
 */
let wasmReady;
var Module = { onRuntimeInitialized: () => wasmReady && wasmReady() };
const wasmPromise = new Promise((r) => { wasmReady = r; });

const BASE = self.KG_BASE || new URL('./', self.location.href).href;
importScripts(BASE + 'tf.min.3.5.0.js', BASE + 'tf-backend-wasm-3.5.0.js', BASE + 'essentia.js-model.umd.js', BASE + 'essentia-wasm.module.js');
if (Module.calledRun) wasmReady();

const NAMES = ['mood_happy', 'mood_sad', 'mood_relaxed', 'mood_aggressive', 'danceability'];
// Index of the "positive" class in each model's output.
const POSITIVE = { mood_happy: 0, mood_sad: 1, mood_relaxed: 1, mood_aggressive: 0, danceability: 0 };

let extractor = null;
const models = {};
let queue = Promise.resolve();

async function init() {
  try {
    tf.wasm.setWasmPaths(BASE);
    await tf.setBackend('wasm');
  } catch (e) {
    await tf.setBackend('cpu');
  }
  await tf.ready();
  await wasmPromise;
  extractor = new EssentiaModel.EssentiaTFInputExtractor(Module, 'musicnn', false);
  for (let i = 0; i < NAMES.length; i++) {
    const n = NAMES[i];
    const m = new EssentiaModel.TensorflowMusiCNN(tf, new URL(`../models/${n}-musicnn-msd-2/model.json`, BASE).href);
    await m.initialize();
    models[n] = m;
    postMessage({ type: 'loading', done: i + 1, total: NAMES.length });
  }
  postMessage({ type: 'ready', backend: tf.getBackend() });
}

async function analyze(id, audio) {
  try {
    const t0 = Date.now();
    const features = extractor.computeFrameWise(audio, 256);
    const scores = {};
    for (const n of NAMES) {
      const preds = await models[n].predict(features, true);
      let sum = 0;
      for (const p of preds) sum += p[POSITIVE[n]];
      scores[n.replace('mood_', '')] = sum / preds.length;
    }
    postMessage({ type: 'result', id, scores, ms: Date.now() - t0 });
  } catch (e) {
    postMessage({ type: 'result', id, error: String(e && e.message || e) });
  }
}

onmessage = (ev) => {
  const d = ev.data;
  if (d.type === 'init') {
    init().catch((e) => postMessage({ type: 'error', error: String(e && e.message || e) }));
  } else if (d.type === 'analyze') {
    const audio = new Float32Array(d.audio);
    queue = queue.then(() => analyze(d.id, audio));
  }
};
