export class Sound {
    audio
    constructor(soundSrc) {
        this.audio = new Audio(soundSrc)
    }

    setLoop(enable){
        this.audio.loop = enable
    }
    setVolume(value){
        this.audio.volume = value
    }
    play() {
        this.audio.addEventListener("canplaythrough", (event) => {
            this.audio.play();
        });
    }

    stop(){
        this.audio.stop();
    }
}