import Point from './point'

const DIRECTION = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
}

const next_direction = {
  [DIRECTION.UP]: [DIRECTION.LEFT, DIRECTION.RIGHT],
  [DIRECTION.DOWN]: [DIRECTION.LEFT, DIRECTION.RIGHT],
  [DIRECTION.LEFT]: [DIRECTION.UP, DIRECTION.DOWN],
  [DIRECTION.RIGHT]: [DIRECTION.UP, DIRECTION.DOWN],
}

export default class Snake{
  constructor(length, size = 5) {
    this.length = length;
    this.size = size;
    this.direction = DIRECTION.RIGHT
    this.lock = false;
    this.init()
  }

  init() {
    const x = Math.round(Math.random() * 30 + 10)
    const y = Math.round(Math.random() * 30 + 10)
    this.snakPoint = Array.from({length: this.length}).map((_, i) => {
      return new Point(x - i, y, this.size)
    })

    this.bindKeyEvent()
  }

  update() {
    const [head] = this.snakPoint
    const tail = this.snakPoint.pop()
    const newHead = tail.copy()
    newHead.x = head.x;
    newHead.y = head.y;
    if(this.direction === DIRECTION.UP){
      newHead.y -= 1
    }
    else if(this.direction === DIRECTION.DOWN){
      newHead.y += 1
    }
    else if(this.direction === DIRECTION.LEFT){
      newHead.x -= 1
    }
    else if(this.direction === DIRECTION.RIGHT){
      newHead.x += 1
    }
    this.snakPoint.unshift(newHead)
    this.lock = false
    return tail
  }

  bindKeyEvent() {
    window.addEventListener('keydown', e => {
      if(this.lock) return
      if(next_direction[this.direction].includes(e.code)){
        this.lock = true // 加锁防止在一个更新内改变两次方向
        this.direction = e.code
      }
    })
  }
}