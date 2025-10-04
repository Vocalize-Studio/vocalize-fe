export async function trimToWavBlob(input: string | Blob, maxSeconds: number) {
  const audioCtx = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const arrayBuffer =
    typeof input === "string"
      ? await (await fetch(input, { credentials: "include" })).arrayBuffer()
      : await input.arrayBuffer();

  const decoded = await audioCtx.decodeAudioData(arrayBuffer);
  const sampleRate = decoded.sampleRate;
  const channels = decoded.numberOfChannels;
  const frameCount = Math.min(
    decoded.length,
    Math.floor(maxSeconds * sampleRate)
  );

  const trimmed = audioCtx.createBuffer(channels, frameCount, sampleRate);
  for (let ch = 0; ch < channels; ch++) {
    const src = decoded.getChannelData(ch);
    trimmed.getChannelData(ch).set(src.subarray(0, frameCount));
  }

  const wavBuffer = encodeWav(trimmed);
  return new Blob([wavBuffer], { type: "audio/wav" });
}

function encodeWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numFrames * blockAlign;
  const bufferSize = 44 + dataSize;

  const ab = new ArrayBuffer(bufferSize);
  const view = new DataView(ab);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");

  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);

  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  const tmp = new Float32Array(numChannels);
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      tmp[ch] = buffer.getChannelData(ch)[i];
      const s = Math.max(-1, Math.min(1, tmp[ch]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
  }
  return ab;
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
