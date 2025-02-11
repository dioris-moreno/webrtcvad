"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAD = void 0;
const bindings_1 = __importDefault(require("bindings"));
const vadBindings = (0, bindings_1.default)("webrtcvad");
class VAD {
    constructor(sampleRate = 16000, level = 3) {
        this.sampleRate = sampleRate;
        this.instance = new vadBindings.VAD(sampleRate, level);
    }
    valid(audio) {
        return (audio.length / 2 == this.sampleRate / 100 ||
            audio.length / 2 == (2 * this.sampleRate) / 100 ||
            audio.length / 2 == (3 * this.sampleRate) / 100);
    }
    process(audio) {
        if (!this.valid(audio)) {
            throw new Error(`Invalid audio length. For a sample rate of ${this.sampleRate}, audio length must be ${(2 * this.sampleRate) / 100}, ${(4 * this.sampleRate) / 100}, or ${(6 * this.sampleRate) / 100}.`);
        }
        return this.instance.process(audio, audio.length / 2);
    }
}
exports.VAD = VAD;
const vad = { VAD };
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = vad;
}
exports.default = vad;
//# sourceMappingURL=index.js.map