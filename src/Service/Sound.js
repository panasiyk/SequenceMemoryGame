export default class Sound {
    soundContext = null;

    static get context() {
        if (!this.soundContext)
            this.soundContext = new AudioContext();
        return this.soundContext
    }

    static get types() {
       return ['sine', 'triangle', 'square', 'sawtooth'];
    }

    static playSound(type, soundValue) {
        let oscillator = this.context.createOscillator()
        let gainNode = this.context.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(this.context.destination)
        oscillator.type = type
        oscillator.frequency.value = soundValue
        gainNode.gain.value = type === 'square' || type === 'sawtooth' ? 0.3 : 0.6
        oscillator.start(0)
        gainNode.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + 1)
    }
}
