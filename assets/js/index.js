import GameWindow from './window'
import Snake from './snake'

let gamewindow
let snake

function start() {
  if(gamewindow){
    gamewindow.destroy()
  }
  const size = 10;
  gamewindow = new GameWindow('canvas', size)
  snake = new Snake(3, size, gamewindow.logicWidth, gamewindow.logicHeight)
  gamewindow.run(snake)
}

document.getElementById('start').onclick = start

