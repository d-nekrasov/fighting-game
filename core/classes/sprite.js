export class Sprite {
    constructor({position, imageSrc, scale = 1, frames = 1,  canvas, framesHold = 7, offset = {x: 0, y:0}}) {
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
        this.framesHold = framesHold
        this.offset = offset
    }

    draw() {
        this.canvas.context.drawImage(
            this.image,
            //frames
            this.frameCurrent * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,



            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale
        )
    }

     animateFrames () {
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

    update() {
        this.draw();
        this.animateFrames()
    }

}