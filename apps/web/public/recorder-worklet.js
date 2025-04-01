class RecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this._buffer = []
    this._length = 0
    this._send_time = undefined

    this._volume = 1

    this.port.onmessage = (event) => {
      console.log('Received message:', event.data);
    };
  }

  process(inputs) {
    if (this._send_time === undefined) {
      this._send_time = currentTime
    }

    const now = currentTime

    const input = inputs[0]
    if (input.length > 0) {
      const channelData = input[0]

      this._buffer.push(new Float32Array(channelData))
      this._length += channelData.length

      if (now - this._send_time > 0.2) {
        this._send_time = now

        // Merge all chunks into one
        const merged = new Float32Array(this._length)
        let offset = 0
        this._buffer.forEach((chunk) => {
          merged.set(chunk, offset)
          offset += chunk.length
        })

        
        // boost volume
        this._volume = this._volume * 1.02;

        // init peak
        let max = 0;

        // detect peak probe
        for (let i = 0; i < merged.length; i++) {
          let probe = merged[i] * this._volume;
          max = Math.max(Math.abs(probe, max));
        }

        // cut volume
        if (max > 1) {
          this._volume = this._volume / max;
        }

        // normalize
        for (let i = 0; i < merged.length; i++) {
          merged[i] = merged[i] * this._volume;
        }

        // report
        console.log(this._volume);

        // Send the merged buffer to the main thread
        this.port.postMessage(merged.buffer, [merged.buffer])

        // Reset the buffer and length
        this._buffer = []
        this._length = 0
      }
    }
    return true
  }
}

registerProcessor('recorder-processor', RecorderProcessor)
