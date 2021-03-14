import {updateGameArea} from '../index.js';

class Loop {
    constructor () {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 480;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
    start () {
        this.interval = setInterval(updateGameArea, 40);
    }
    clear () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    stop () {
        clearInterval(this.interval);
    }
};

export {Loop};
