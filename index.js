const CANVAS = document.querySelector('canvas');
const c = CANVAS.getContext('2d');
const GRAVITY = 0.2;

CANVAS.width = 1024;
CANVAS.height = 576;

c.fillRect(0, 0, CANVAS.width, CANVAS.height)


class Sprite {
	constructor({position, velocity}) {
		this.position = position;
		this.velocity  = velocity;
		this.height = 150;
	}

	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, 50, this.height)
	}

	update() {
		this.draw();

		this.position.y += this.velocity.y

		if(this.position.y + this.height + this.velocity.y >= CANVAS.height) {
			this.velocity.y = 0;
		}
		else{
			this.velocity.y += GRAVITY
		}
	}
}

const player = new Sprite({
	position: {
		x: 0, y: 0,
	},
	velocity: {
		x: 0, y: 10
	}
})


const enemy = new Sprite({
	position: {
		x: 400, y: 0,
	},
	velocity: {
		x: 0, y: 10
	}
})



function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = '#000'
	c.fillRect(0,0, CANVAS.width, CANVAS.height)
	player.update();
	enemy.update()
}

animate()