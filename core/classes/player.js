export class Player {
    constructor({position, velocity, color = 'red', offset, canvas}) {
        this.position = position;
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
            width: 100,
            height: 50,
            offset
        }
        this.canvas = canvas
        this.GRAVITY =  0.7;
    }

    draw() {
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fillRect(this.position.x, this.position.y, this.width, this.height)
        //Attack box
        if(this.isAttacking){
            this.canvas.context.fillStyle = "green";
            this.canvas.context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }

    }

    update() {
        this.draw();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= this.canvas.CANVAS.height - 96) {
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += this.GRAVITY
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(()=>{
            this.isAttacking = false;
        }, 100)
    }
}