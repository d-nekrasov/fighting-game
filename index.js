const CANVAS = document.querySelector('canvas');
const c = CANVAS.getContext('2d');
const GRAVITY = 0.7;
const KEYS = {
	KeyA: {
		pressed: false
	},
	KeyD: {
		pressed: false
	},
	KeyW: {
		pressed: false
	},
	ArrowRight: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	},
	ArrowUp: {
		pressed: false
	}
}

CANVAS.width = 1024;
CANVAS.height = 576;

c.fillRect(0, 0, CANVAS.width, CANVAS.height)


class Player {
	constructor({position, velocity}) {
		this.position = position;
		this.velocity  = velocity;
		this.height = 150;
		this.lastKey
	}

	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, 50, this.height)
	}

	update() {
		this.draw();
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if(this.position.y + this.height + this.velocity.y >= CANVAS.height) {
			this.velocity.y = 0;
		}
		else{
			this.velocity.y += GRAVITY
		}
	}
}

const player1 = new Player({
	position: {
		x: 0, y: 0,
	},
	velocity: {
		x: 0, y: 10
	}
})


const player2 = new Player({
	position: {
		x: 400, y: 0,
	},
	velocity: {
		x: 0, y: 10
	}
})



function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = '#000000'
	c.fillRect(0,0, CANVAS.width, CANVAS.height)
	c.fillStyle = "#ffffff";
	c.font = '24px Sans-Serif'
	c.fillText('P1', player1.position.x, player1.position.y)
	c.fillText('P2', player2.position.x, player2.position.y)
	player1.update();
	player2.update()

	//Player 1 movement
	player1.velocity.x = 0
	if(KEYS.KeyA.pressed && player1.lastKey === 'KeyA'){
		player1.velocity.x = -5;
	}else if(KEYS.KeyD.pressed &&  player1.lastKey === 'KeyD') {
		player1.velocity.x = 5;
	}

	//Player 2 movement
	player2.velocity.x = 0
	if(KEYS.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft'){
		player2.velocity.x = -5;
	}else if(KEYS.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
		player2.velocity.x = 5;
	}

}

animate()


window.addEventListener('keydown', (event)=>{
	console.log(event)
	switch (event.code) {
		//Player 1
		case 'KeyD':
			KEYS.KeyD.pressed = true
			player1.lastKey = 'KeyD'
			break
		case 'KeyA':
			KEYS.KeyA.pressed = true
			player1.lastKey = 'KeyA'
			break
		case 'KeyW':
			player1.velocity.y = -20
			break
		//Player 2

		case 'ArrowRight':
			KEYS.ArrowRight.pressed = true
			player2.lastKey = 'ArrowRight';
			break
		case 'ArrowLeft':
			KEYS.ArrowLeft.pressed = true
			player2.lastKey = 'ArrowLeft';
			break
		case 'ArrowUp':
			player2.velocity.y = -20
			break
	}
})

window.addEventListener('keyup', (event)=>{
	switch (event.code) {
		//Player 1
		case 'KeyD':
			KEYS.KeyD.pressed = false
			break
		case 'KeyA':
			KEYS.KeyA.pressed = false
			break

		//Player 2

		case 'ArrowRight':
			KEYS.ArrowRight.pressed = false
			break
		case 'ArrowLeft':
			KEYS.ArrowLeft.pressed = false
			break
	}


})