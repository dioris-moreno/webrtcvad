import { VAD } from "../lib/cjs/index";

describe("WebRtcVad Library", () => {
  let vad: VAD;

  beforeAll(() => {
    vad = new VAD(16000, 3); // Create a VAD instance with default values
  });

  test("VAD instance should be created", () => {
    expect(vad).toBeDefined();
  });

  test("VAD should process valid audio buffer", () => {
    const buffer = Buffer.alloc(320, 0); // Create a silent buffer
    const result = vad.process(buffer);
    expect(typeof result).toBe("boolean"); // Should return a boolean
  });

  test("VAD should throw an error for invalid buffer size", () => {
    const invalidBuffer = Buffer.alloc(100); // Wrong size
    expect(() => vad.process(invalidBuffer)).toThrow();
  });

  test("VAD should detect silence correctly", () => {
    const silenceBuffer = Buffer.alloc(320, 0); // A buffer of silence
    const isSpeech = vad.process(silenceBuffer);
    expect(isSpeech).toBe(false); // Silence should not be detected as speech
  });

  //   test("VAD should detect speech (simulate with non-zero buffer)", () => {
  //     const speechBuffer = Buffer.alloc(320, 255); // Simulated speech
  //     const isSpeech = vad.process(speechBuffer);
  //     expect(isSpeech).toBe(true); // Expect it to detect speech
  //   });
});
