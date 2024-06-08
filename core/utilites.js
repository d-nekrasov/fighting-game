/**
 *
 * @param rectangle1
 * @param rectangle2
 * @returns {boolean}
 */
export function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

let timer = 99
export let timerId
export function decreaseTimer(player1, player2){
    timerId = setTimeout(()=> {
        decreaseTimer(player1, player2, timerId)
    }, 1000)
    if (timer > 0 ) {
        timer --
        document.querySelector('.timer .timer-count').innerText = timer
    }
    if (timer === 0 ) {
        determinateWinner(player1, player2, timerId)
    }
}

export function determinateWinner(player1, player2, timerId){
    clearTimeout(timerId)
    if (player1.health > player2.health) {
        showGameResult('Player 1 Win!')
    }
    if (player2.health > player1.health) {
        showGameResult('Player 2 Win!')
    }
    if (player1.health === player2.health){
        showGameResult('Tie!')
    }
}

export function showGameResult(message){
    document.querySelector('#gameStatus').innerHTML = `<p>${message}</p>`
}