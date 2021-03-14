import {Loop} from './js/game.js';
import {Player, Ball} from './js/characters.js';

let loop;
let player;
let ball;

export function startGame() {
    loop = new Loop();
    loop.start();
    
    player = new Player();
    ball = new Ball(player);
}

function updateGameArea() {
    if (ball.collisionDetection(player)) {
        loop.clear();
        player.update();
        ball.update();
        loop.stop()
    } else {
        loop.clear();
        player.update();
        ball.update();
        ball.newPos()
    }
}


export {loop, player, ball, updateGameArea};
