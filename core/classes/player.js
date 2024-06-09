import {Sprite} from "./sprite.js";

export class Player extends Sprite{
    constructor({
                    position,
                    velocity,
                    color = 'red',
                    offset,
                    canvas,
                    imageSrc,
                    scale = 1,
                    frames = 1,
                    framesHold,
                    sprites = {},
                    attackBox = {
                        offset: {},
                        width: undefined,
                        height: undefined
                    }
    }) {
        super({
            position,
            imageSrc,
            scale,
            frames,
            framesHold,
            offset
        });
        this.frameCurrent = 0;
        this.frameElapsed = 0;
        this.velocity  = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey = '';
        this.color = color;
        this.isAttacking = false;
        this.health = 100
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset
        }
        this.canvas = canvas
        this.GRAVITY =  0.7;
        this.sprites = sprites
        this.isDead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].src
        }
    }

    update() {
        this.draw();
        if(!this.isDead) {
            this.animateFrames()
        }
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // this.canvas.context.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= this.canvas.CANVAS.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;
        }
        else{
            this.velocity.y += this.GRAVITY
        }

    }

    attack(){
        this.switchSprite('fastAttack')
        this.isAttacking = true;
    }

    takeHit(damage) {
        this.health -= damage
        if(this.health <= 0 ) {
            this.switchSprite('death')
        }
        else {
            this.switchSprite('hit')
        }
    }

    switchSprite(spriteName) {
        if (this.image === this.sprites.death.image){
            if(this.frameCurrent === this.sprites.death.frames - 1) {
                this.isDead = true
            }
            return
        }
        if (this.image === this.sprites.fastAttack.image && this.frameCurrent < this.sprites.fastAttack.frames - 1){
            return
        }
        if (this.image === this.sprites.hit.image && this.frameCurrent < this.sprites.hit.frames - 1){
            return
        }


        switch (spriteName){
            case 'idle':
                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.frames = this.sprites.idle.frames
                    this.frameCurrent = 0
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.frames = this.sprites.run.frames
                    this.frameCurrent = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.frames = this.sprites.jump.frames
                    this.frameCurrent = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.frames = this.sprites.fall.frames
                    this.frameCurrent = 0
                }
                break
            case 'fastAttack':
                if(this.image !== this.sprites.fastAttack.image) {
                    this.image = this.sprites.fastAttack.image
                    this.frames = this.sprites.fastAttack.frames
                    this.frameCurrent = 0
                }
                break
            case 'hit':
                if(this.image !== this.sprites.hit.image) {
                    this.image = this.sprites.hit.image
                    this.frames = this.sprites.hit.frames
                    this.frameCurrent = 0
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.frames = this.sprites.death.frames
                    this.frameCurrent = 0
                }
                break
        }
    }
}