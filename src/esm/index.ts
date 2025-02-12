// index.esm.ts (For ESM Build)
import bindings from "bindings";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Use import.meta.url in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../");

const vadBindings = bindings({
  bindings: "webrtcvad",
  module_root: rootDir,
});

class VAD {
  private sampleRate: number;
  private instance: any;

  constructor(sampleRate: number = 16000, level: number = 3) {
    this.sampleRate = sampleRate;
    this.instance = new vadBindings.VAD(sampleRate, level);
  }

  private valid(audio: Buffer): boolean {
    return (
      audio.length / 2 == this.sampleRate / 100 ||
      audio.length / 2 == (2 * this.sampleRate) / 100 ||
      audio.length / 2 == (3 * this.sampleRate) / 100
    );
  }

  process(audio: Buffer): boolean {
    if (!this.valid(audio)) {
      throw new Error(
        `Invalid audio length. For a sample rate of ${
          this.sampleRate
        }, audio length must be ${(2 * this.sampleRate) / 100}, ${
          (4 * this.sampleRate) / 100
        }, or ${(6 * this.sampleRate) / 100}.`
      );
    }
    return this.instance.process(audio, audio.length / 2);
  }
}

// ✅ Properly support both ESM and CommonJS
const vad = { VAD };

// CommonJS compatibility
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = vad;
}

// Default export for ESM
export default vad;
export { VAD };
