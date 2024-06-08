import {Sprite} from "./core/classes/sprite.js";
import {Player} from "./core/classes/player.js";
import {timerId, rectangularCollision, determinateWinner, decreaseTimer} from "./core/utilites.js";


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


// Создание Canvas и его контекста
const CANVAS = document.querySelector('canvas');
const c = CANVAS.getContext('2d');
CANVAS.width = 1024
CANVAS.height = 576
c.fillRect(0, 0, CANVAS.width, CANVAS.height)


// Спрайты окружения
const background = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: './assets/sprites/background.png',
	canvas: {
		CANVAS: CANVAS,
		context: c
	}

})
const shop = new Sprite({
	position: {
		x: 700,
		y: 135
	},
	imageSrc: './assets/sprites/shop.png',
	scale: 2.7,
	frames: 6,
	canvas: {
		CANVAS: CANVAS,
		context: c
	}
})

// Создание игроков
const player1 = new Player({
	position: {
		x: 0, y: 0,
	},
	velocity: {
		x: 0, y: 10
	},
	offset: {
		x: 0, y: 0
	},
	canvas: {
		CANVAS: CANVAS,
		context: c
	}
})
const player2 = new Player({
	position: {
		x: 400, y: 0,
	},
	velocity: {
		x: 0, y: 10
	},
	color: 'blue',
	offset: {
		x: -50, y: 0
	},
	canvas: {
		CANVAS: CANVAS,
		context: c
	}
})


decreaseTimer(player1, player2)

function animate() {

	window.requestAnimationFrame(animate)
	c.fillStyle = '#000000'
	c.fillRect(0,0, CANVAS.width, CANVAS.height)
	c.fillStyle = "#ffffff";
	c.font = '24px Sans-Serif'
	c.fillText('P1', player1.position.x, player1.position.y)
	c.fillText('P2', player2.position.x, player2.position.y)
	background.update()
	shop.update()

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

	/**
	 * Detect for collision
	 */
	//Player1
	if(rectangularCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking ){
		player1.isAttacking = false;
		player2.health  -= 10
		document.querySelector('#player2Health .health-point').style.width = `${player2.health}%`
		if(player2.health <= 0) {
			determinateWinner(player1, player2, timerId)
		}
		console.log('Player1 attack')
	}

	//Player2
	if(rectangularCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking ){
		player2.isAttacking = false;
		player1.health  -= 10
		document.querySelector('#player1Health .health-point').style.width = `${player1.health}%`
		if(player1.health <= 0) {
			determinateWinner(player1, player2, timerId)
		}
		console.log('Player2 attack')
	}

}

animate()


window.addEventListener('keydown', (event)=>{
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
		case 'Space':
			player1.attack();
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
		case 'Enter':
			player2.attack()
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