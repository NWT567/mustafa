// Procedural coffee-themed sound effects using the Web Audio API.
// No network calls, no assets — synthesized in-browser on demand.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(ac: AudioContext, seconds: number) {
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

/** Ceramic clink — bright short bell. */
export function playClink(volume = 0.25) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  [1760, 2640, 3520].forEach((f, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f, now);
    o.frequency.exponentialRampToValueAtTime(f * 0.92, now + 0.4);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(volume / (i + 1), now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    o.connect(g).connect(ac.destination);
    o.start(now);
    o.stop(now + 0.5);
  });
}

/** Warm coffee pour — filtered noise with subtle body. */
export function playPour(duration = 1.4, volume = 0.18) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, duration);
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(600, now);
  bp.frequency.linearRampToValueAtTime(1200, now + duration);
  bp.Q.value = 0.9;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(volume, now + 0.15);
  g.gain.linearRampToValueAtTime(volume * 0.8, now + duration - 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  src.connect(bp).connect(g).connect(ac.destination);
  src.start(now);
  src.stop(now + duration);
}

/** Espresso machine steam hiss. */
export function playSteam(duration = 0.9, volume = 0.12) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, duration);
  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 2400;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(volume, now + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  src.connect(hp).connect(g).connect(ac.destination);
  src.start(now);
  src.stop(now + duration);
}

/** Soft UI tap — muted wood knock. */
export function playTap(volume = 0.18) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(220, now);
  o.frequency.exponentialRampToValueAtTime(90, now + 0.12);
  g.gain.setValueAtTime(volume, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
  o.connect(g).connect(ac.destination);
  o.start(now);
  o.stop(now + 0.16);
}