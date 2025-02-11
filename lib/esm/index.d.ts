declare class VAD {
    private sampleRate;
    private instance;
    constructor(sampleRate?: number, level?: number);
    private valid;
    process(audio: Buffer): boolean;
}
declare const vad: {
    VAD: typeof VAD;
};
export default vad;
export { VAD };
