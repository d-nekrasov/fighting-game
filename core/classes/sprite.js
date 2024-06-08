export class Sprite {
    constructor({position, imageSrc, scale = 1, frames = 1,  canvas}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image()
        this.image.src = imageSrc
        this.canvas = canvas
        this.scale = scale
        this.frames = frames
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.framesHold = 7
    }

    draw() {
        this.canvas.context.drawImage(
            this.image,
            //frames
            this.frameCurrent * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,



            this.position.x,
            this.position.y,
            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale
        )
    }

    update() {
        this.draw();
        this.frameElapsed++
        if(this.frameElapsed % this.framesHold === 0){
            if(this.frameCurrent < this.frames - 1){
                this.frameCurrent++
            }
            else {
                this.frameCurrent = 0
            }
        }
    }

}