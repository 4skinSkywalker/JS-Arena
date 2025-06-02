class DownsampleProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.downsampled = new Int16Array(2048);
    this.downsampleOffset = 0;
  }

  processSamples() {
    while (this.downsampleOffset > 320) {
      const output = this.downsampled.slice(0, 320);
      this.port.postMessage(Array.from(output));
      this.downsampled.copyWithin(0, 320);
      this.downsampleOffset -= 320;
    }
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const sampleRatio = sampleRate / 16000;

    if (input && input[0]) {
      const inputChannel = input[0];

      for (let i = 0; i < inputChannel.length; i += sampleRatio) {
        const sidx = ~~(i);
        const tidx = ~~(i / sampleRatio);
        this.downsampled[this.downsampleOffset + tidx] = inputChannel[sidx] * 32767;
      }
    
      this.downsampleOffset += ~~(inputChannel.length / sampleRatio);

      if (this.downsampleOffset > 320) {
        this.processSamples();
      }

      // Silence output (if needed)
      outputs.forEach(output => output[0].fill(0));
    }

    return true;
  }
}

registerProcessor("downsample-processor", DownsampleProcessor);