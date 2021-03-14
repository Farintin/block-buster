import {loop} from '../index.js';

class Player {
    constructor () {
        this.width = 100;
        this.height = 10;
        this.color = "blue";
                
        this.ctx = loop.context;
        this.x = (this.ctx.canvas.width / 2) - (this.width / 2);
        this.y = this.ctx.canvas.height - this.height;
        this.rect = {
            top : this.y,
            bottom : this.y + this.height,
            left : this.x,
            right : this.x + this.width
        };
        
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.update = function() {
            this.ctx = loop.context;
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    
    newPos () {
        this.x += this.vx
    }
};

class Ball {
    constructor (player) {
        this.radius = 8;
        this.x = player.x + (player.width / 2);
        this.y = player.y - this.radius - 1;
        this.color = "red";
        this.vx = -12;
        this.vy = -10;
        this.rect = {}
        
        this.ctx = loop.context;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    update () {
        this.ctx = loop.context;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    newPos() {
        this.x += this.vx;
        this.y += this.vy;
    }
    collisionDetection (player) {
        this.rect.left = this.x - this.radius;
        this.rect.right = this.x + this.radius;
        this.rect.top = this.y - this.radius;
        this.rect.bottom = this.y + this.radius;
        this.rect.width = this.radius * 2;
        this.rect.height = this.radius * 2;
        
        let crash = false;
        if (this.rect.top <= 0) {
            this.y = 0 + this.radius;
            this.vy *= -1;
        } else if (this.rect.left <= 0) {
            this.x = 0 + this.radius;
            this.vx *= -1;
        } else if (this.rect.right >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.radius;
            this.vx *= -1;
        } else if (this.rect.bottom >= player.rect.top) {
            if (this.rect.bottom >= this.ctx.canvas.height) {
                if (!((this.x >= player.rect.left) && (this.x <= player.rect.right))) {
                    this.y = this.ctx.canvas.height - this.radius;
                    this.vy = 0;
                    crash = true;
                    console.log('crash')
                }
            };
            if ((this.x >= player.rect.left) && (this.x <= player.rect.right)) {
                this.y = player.rect.top - this.radius;
                this.vy *= -1;
                crash = false;
                console.log('player hit')
            }
        };
        return crash;
    }
};




export {Player, Ball}
