/**
 * Web Audio API synthesizer that generates a sweet, warm, emotional acoustic melody
 * for the birthday dedication when no custom MP3 is uploaded yet.
 */
class MelodySynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;
  private volume: number = 0.6;

  // Emotional, soothing pentatonic birthday & friendship melody notes (frequencies in Hz)
  private readonly melodyNotes: { freq: number; duration: number }[] = [
    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 293.66, duration: 0.7 }, // D4
    { freq: 261.63, duration: 0.7 }, // C4
    { freq: 349.23, duration: 0.7 }, // F4
    { freq: 329.63, duration: 1.2 }, // E4

    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 293.66, duration: 0.7 }, // D4
    { freq: 261.63, duration: 0.7 }, // C4
    { freq: 392.00, duration: 0.7 }, // G4
    { freq: 349.23, duration: 1.2 }, // F4

    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 261.63, duration: 0.4 }, // C4
    { freq: 523.25, duration: 0.7 }, // C5
    { freq: 440.00, duration: 0.7 }, // A4
    { freq: 349.23, duration: 0.7 }, // F4
    { freq: 329.63, duration: 0.7 }, // E4
    { freq: 293.66, duration: 1.1 }, // D4

    { freq: 466.16, duration: 0.4 }, // Bb4
    { freq: 466.16, duration: 0.4 }, // Bb4
    { freq: 440.00, duration: 0.7 }, // A4
    { freq: 349.23, duration: 0.7 }, // F4
    { freq: 392.00, duration: 0.7 }, // G4
    { freq: 349.23, duration: 1.5 }, // F4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    
    // Main warm triangle oscillator (music box / warm rhodes feel)
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm sub-harmonic sine
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 0.5, now);

    const masterGain = this.volume * 0.25;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(masterGain, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration * 1.6);
    osc2.stop(now + duration * 1.6);
  }

  private scheduleNext() {
    if (!this.isPlaying) return;

    const note = this.melodyNotes[this.noteIndex];
    this.playTone(note.freq, note.duration);

    const nextDelay = note.duration * 1000 + 120;
    this.noteIndex = (this.noteIndex + 1) % this.melodyNotes.length;

    this.timer = window.setTimeout(() => {
      this.scheduleNext();
    }, nextDelay);
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.scheduleNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const melodySynth = new MelodySynth();
