const canvas = document.querySelector('#canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const c = canvas.getContext('2d')

// rectangle
// c.fillStyle = 'rgba(0, 255, 0, .5)'
// c.fillRect(20, 20, 100, 100)

// line
// c.beginPath()
// c.moveTo(20, 140)
// c.lineTo(20, 240)
// c.lineTo(120, 240)
// c.lineTo(120, 140)
// c.lineTo(20, 140)
// c.lineWidth = 5
// c.strokeStyle = 'red'
// c.stroke()

// arc
// c.beginPath()
// c.arc(75, 315, 55, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.lineWidth = 2
// c.stroke()

// multiple arcs
// for (let i = 0; i < 3; i++) {
//   c.beginPath()
//   c.arc(Math.random() * 600, Math.random() * 600, 55, 0, Math.PI * 2, false)
//   c.strokeStyle = 'purple'
//   c.lineWidth = 2
//   c.stroke()
// }

// let x = 50
// let y = 50
// let dx = 7
// let dy = 7

mouse = {
  x: undefined,
  y: undefined
}

const maxRadius = 40
const minRadius = 5

const colorArray = [
  '#ffaa33',
  '#99ffaa',
  '#00ff00',
  '#4411aa',
  '#ff1100'
]

addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

addEventListener('resize', (e) => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.lineWidth = 2
    c.strokeStyle = this.color
    c.fillStyle = this.color
    c.fill()
    c.stroke()
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy

    // interactivity
    if (mouse.x - this.x < 70 && mouse.x - this.x > -70 && mouse.y - this.y < 70 && mouse.y - this.y > -70) {
      if (this.radius < maxRadius) {
        this.radius += 2
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1
    }

    this.draw()
  }
}


var circleArray = []
function init() {
  circleArray = []
  for (let index = 0; index < 500; index++) {
    var radius = Math.random() * 3 + 1
    var x = (Math.random() * (innerWidth - radius * 2)) + radius
    var y = (Math.random() * (innerHeight - radius * 2)) + radius
    var dx = (Math.random() - 0.5) * 3
    var dy = (Math.random() - 0.5) * 3
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

function animateCircle() {
  requestAnimationFrame(animateCircle)
  c.clearRect(0, 0, innerWidth, innerHeight)

  circleArray.forEach(circle => {
    circle.update()
  })
}

init()
animateCircle()