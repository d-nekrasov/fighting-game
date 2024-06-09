import {Sprite} from "./core/classes/sprite.js";
import {Player} from "./core/classes/player.js";
import {Sound} from "./core/classes/sound.js";
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
	},
	framesHold: 7

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
	},
	framesHold: 7
})
const npc = new Sprite({
	position: {
		x: 630,
		y: 265
	},
	imageSrc: './assets/sprites/bg_forest_npc.png',
	scale: 2,
	frames: 17,
	canvas: {
		CANVAS: CANVAS,
		context: c
	},
	framesHold: 17
})

// Создание игроков
const player1 = new Player({
	position: {
		x: 250, y: 0,
	},
	velocity: {
		x: 0, y: 10
	},
	offset: {
		x: 215, y: 153
	},
	canvas: {
		CANVAS: CANVAS,
		context: c
	},
	imageSrc: './assets/sprites/samuraiMack/Idle.png',
	scale: 2.5,
	frames: 8,
	framesHold: 7,
	sprites: {
		idle: {
			src: './assets/sprites/samuraiMack/Idle.png',
			frames: 8
		},
		run: {
			src: './assets/sprites/samuraiMack/Run.png',
			frames: 8
		},
		jump: {
			src: './assets/sprites/samuraiMack/Jump.png',
			frames: 2
		},
		fall: {
			src: './assets/sprites/samuraiMack/Fall.png',
			frames: 2
		},
		fastAttack: {
			src: './assets/sprites/samuraiMack/Attack1.png',
			frames: 6
		},
		hit: {
			src: './assets/sprites/samuraiMack/Take Hit.png',
			frames: 4
		},
		death: {
			src: './assets/sprites/samuraiMack/Death.png',
			frames: 6
		}
	},
	attackBox: {
		offset: {
			x: 0,
			y: 50,
		},
		width: 230,
		height: 50
	}
})
const player2 = new Player({
	position: {
		x: 650, y: 0,
	},
	velocity: {
		x: 0, y: 10
	},
	color: 'blue',
	offset: {
		x: 215, y: 153
	},
	canvas: {
		CANVAS: CANVAS,
		context: c
	},
	imageSrc: './assets/sprites/kenji/Idle.png',
	scale: 2.4,
	frames: 4,
	framesHold: 12,
	sprites: {
		idle: {
			src: './assets/sprites/kenji/Idle.png',
			frames: 4
		},
		run: {
			src: './assets/sprites/kenji/Run.png',
			frames: 8
		},
		jump: {
			src: './assets/sprites/kenji/Jump.png',
			frames: 2
		},
		fall: {
			src: './assets/sprites/kenji/Fall.png',
			frames: 2
		},
		fastAttack: {
			src: './assets/sprites/kenji/Attack1.png',
			frames: 4
		},
		hit: {
			src: './assets/sprites/kenji/Take hit.png',
			frames: 3
		},
		death: {
			src: './assets/sprites/kenji/Death.png',
			frames: 7
		}
	},
	attackBox: {
		offset: {
			x: -170,
			y: 50,
		},
		width: 155,
		height: 50
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
	npc.update()
	c.fillStyle = "rgba(0,0,0,0.5)";
	c.fillRect(0,0, CANVAS.width, CANVAS.height)
	player1.update();
	player2.update()


	//дождь
	c.strokeStyle = 'rgba(255,255,255,0.1)';
	c.lineWidth = 0.8;
	c.lineCap = 'round';

	const init = [];
	const maxParts = 1000;
	for(let a = 0; a < maxParts; a++) {
		init.push({
			x: Math.random() * CANVAS.width,
			y: Math.random() * CANVAS.height,
			l: Math.random(),
			xs: -4 + Math.random() * 4 + 2,
			ys: Math.random() * 10 + 10
		})
	}

	const particles = [];
	for(let b = 0; b < maxParts; b++) {
		particles[b] = init[b];
	}

	function draw() {
		//c.clearRect(0, 0, CANVAS.width, CANVAS.height);
		for(let d = 0; d < particles.length; d++) {
			const p = particles[d];
			c.beginPath();
			c.moveTo(p.x, p.y);
			c.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
			c.stroke();
		}
		move();
	}

	function move() {
		for(let b = 0; b < particles.length; b++) {
			const p = particles[b];
			p.x += p.xs;
			p.y += p.ys;
			if(p.x > CANVAS.width || p.y > CANVAS.height) {
				p.x = Math.random() * CANVAS.width;
				p.y = -20;
			}
		}
	}

	draw()

	//Player 1 movement
	player1.velocity.x = 0



	if(KEYS.KeyA.pressed && player1.lastKey === 'KeyA'){
		player1.velocity.x = -5;
		player1.switchSprite('run')
	}else if(KEYS.KeyD.pressed &&  player1.lastKey === 'KeyD') {
		player1.velocity.x = 5;
		player1.switchSprite('run')
	}
	else {
		player1.switchSprite('idle')
	}

	if(player1.velocity.y < 0 ){
		player1.switchSprite('jump')
	}
	if(player1.velocity.y > 0) {
		player1.switchSprite('fall')
	}


	//Player 2 movement
	player2.velocity.x = 0

	if(KEYS.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft'){
		player2.velocity.x = -5;
		player2.switchSprite('run')
	}else if(KEYS.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
		player2.velocity.x = 5;
		player2.switchSprite('run')
	}
	else {
		player2.switchSprite('idle')
	}

	if(player2.velocity.y < 0 ){
		player2.switchSprite('jump')
	}
	if(player2.velocity.y > 0) {
		player2.switchSprite('fall')
	}

	/**
	 * Detect for collision
	 */
	//Player1
	if(rectangularCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking  && player1.frameCurrent === 4){
		player1.isAttacking = false;
		player2.takeHit(13)
		document.querySelector('#player2Health .health-point').style.width = `${player2.health}%`
		if(player2.health <= 0) {
			document.querySelector('#player2Health .health-point').style.width = `0px`
			determinateWinner(player1, player2, timerId)
		}
		console.log('Player1 attack')
	}

	if(player1.isAttacking && player1.frameCurrent === 4) {
		player1.isAttacking = false
	}

	//Player2
	if(rectangularCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking && player2.frameCurrent === 2){
		player2.isAttacking = false;
		player1.takeHit(10)
		document.querySelector('#player1Health .health-point').style.width = `${player1.health}%`
		if(player1.health <= 0) {
			document.querySelector('#player1Health .health-point').style.width = `0px`
			determinateWinner(player1, player2, timerId)
		}
		console.log('Player2 attack')
	}

	if(player2.isAttacking && player2.frameCurrent === 2) {
		player2.isAttacking = false
	}

}

animate()

const backgroundAudio = new Sound('./assets/sound/bg/grimyth - Nocturnis Stronghold.wav');
backgroundAudio.setVolume(0.2)
backgroundAudio.setLoop(true)

const forestAudio = new Sound('./assets/sound/bg/FarBeyond Studio - Atmos - Dark Forest (CC-BY).ogg');
forestAudio.setVolume(0.1)
forestAudio.setLoop(true)

const rainAudio = new Sound('./assets/sound/bg/FarBeyond Studio - Atmos - Rain (CC-BY).ogg');
rainAudio.setVolume(0.3)
rainAudio.setLoop(true)

backgroundAudio.play()
forestAudio.play()
rainAudio.play()



window.addEventListener('keydown', (event)=>{
	if(!player1.isDead && !player2.isDead){
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