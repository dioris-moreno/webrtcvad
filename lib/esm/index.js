import bindings from "bindings";
const vadBindings = bindings("webrtcvad");
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
const vad = { VAD };
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = vad;
}
export default vad;
export { VAD };
//# sourceMappingURL=index.js.map