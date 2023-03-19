import Target from './point'

export default class GameWindow{
  constructor(id, size = 5){
    this.id = id;
    this.score = 0
    this.speed = 10
    this.size = size
    this.init()
  }

  init() {
    this.canvas = document.getElementById(this.id)
    this.width = this.canvas.width;
    this.logicWidth = this.width / this.size;
    this.height = this.canvas.height;
    this.logicHeight = this.height / this.size; 
    this.ctx = this.canvas.getContext("2d")
    this.ctx.lineCap = "round"
    this.drawBg();
    this.drawText();
    this.createTarget()
    this.drawTarget();
  }

  drawBg(){
    this.clearRect(0, 0, this.logicWidth, this.logicHeight)
    this.ctx.fillStyle = 'white';
    this.fillRect(0, 0, this.logicWidth, this.logicHeight)
  }
  createTarget(){
    const x = Math.floor(Math.random() * this.logicWidth);
    const y = Math.floor(Math.random() * this.logicHeight);
    this.target = new Target(x ,y, this.size)
  }
  drawTarget(){
    this.ctx.save()
    this.ctx.fillStyle = 'red'
    this.drawPoint(this.target)
    this.ctx.restore()
  }

  drawText(){
    this.ctx.font = "24px '微软雅黑'";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`得分：${this.score}`, 20, 20, )
  }

  drawPoint(point) {
    this.fillRect(point.x, point.y , 1, 1)
  }

  clearRect(x, y, sx, sy){
    this.ctx.fillRect(x * this.size, y * this.size, sx * this.size, sy * this.size)
  }
  fillRect(x, y, sx, sy){
    this.ctx.fillRect(x * this.size, y * this.size, sx * this.size, sy * this.size)
  }

  drawSnake() {
    this.ctx.save();
    this.ctx.fillStyle='black'
    for(const point of this.snake.snakPoint){
      this.drawPoint(point)
    }
    this.ctx.restore();
  }

  startAnimation(){
    this.runner = setTimeout(()=>{
      this.startAnimation.call(this)
    }, 1000 / this.speed)
    this.draw()
  }

  // 调用入口
  run(snake) {
    this.snake = snake
    this.startAnimation()
  }

  validateSnake(){
    const head = this.snake.snakPoint[0]
    let validateor = false
    if(head.x < 0) {
      validateor = true
    }
    if(head.y < 0) {
      validateor =  true
    }
    if(head.x > this.logicWidth - 1) {
      validateor = true
    }
    if(head.y > this.logicHeight - 1) {
      validateor = true
    }
    const eatSelf = this.snake.snakPoint.slice(1).some(point => {
      return point.compare(head)
    })
    // 超出屏幕了
    if(validateor || eatSelf) {
      clearTimeout(this.runner)
      console.log('游戏结束')
    }
    return validateor
  }

  validateEat() {
    const head = this.snake.snakPoint[0]
    return head.compare(this.target)
  }

  draw() {
    const tail = this.snake.update();
    const validateor = this.validateSnake()
    if(validateor){
      return 
    }
    const eat = this.validateEat()
    if(eat) {
      this.score += 1;
      this.speed += Math.floor(this.score / 5)
      this.createTarget()
      this.snake.snakPoint.push(tail)
    }
    this.drawBg();
    this.drawText()
    this.drawTarget();
    this.drawSnake();
  }

  destroy(){
    clearTimeout(this.runner)
  }
}