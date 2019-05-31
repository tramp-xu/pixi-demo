import { Application, Graphics, Text, TextStyle } from '@/utils/constant'
// Graphics 实例对象
const app = new Application({
  width: 512,
  height: 512,
  antialias: true,
  transparent: false,
  resolution: 1
})
document.body.appendChild(app.view)

// 矩形 rectangle.drawRect(x, y, width, height);
let rectangle = new Graphics()
rectangle.lineStyle(4, 0xFF3300, 1)
rectangle.beginFill(0x66CCFF)
rectangle.drawRect(0, 0, 64, 64)
rectangle.endFill()
rectangle.x = 170
rectangle.y = 170
app.stage.addChild(rectangle)

// 圆形 circle.drawCircle(x, y, radius)
let circle = new Graphics()
circle.beginFill(0x9966FF)
circle.drawCircle(0, 0, 32)
circle.endFill()
circle.x = 64
circle.y = 130
app.stage.addChild(circle)

// 椭圆 drawEllipse(x, y, width, height);
let ellipse = new Graphics()
ellipse.beginFill(0xFFFF00)
ellipse.drawEllipse(0, 0, 50, 20)
ellipse.endFill()
ellipse.x = 180
ellipse.y = 130
app.stage.addChild(ellipse)

// 圆角矩形 drawRoundedRect(x, y, width, height, cornerRadius)
let roundBox = new Graphics()
roundBox.lineStyle(4, 0x99CCFF, 1)
roundBox.beginFill(0xFF9933)
roundBox.drawRoundedRect(0, 0, 84, 36, 10)
roundBox.endFill()
roundBox.x = 48
roundBox.y = 190
app.stage.addChild(roundBox)

// 线段 lineStyle()
let line = new Graphics()
line.lineStyle(4, 0xFFFFFF, 1)
line.moveTo(0, 0)
line.lineTo(80, 50)
line.x = 32
line.y = 32
app.stage.addChild(line)

// 多边形
let triangle = new Graphics()
triangle.beginFill(0x66FF33)

// Use `drawPolygon` to define the triangle as
// a path array of x/y positions

triangle.drawPolygon([
  -32, 64, // First point
  32, 64, // Second point
  0, 0 // Third point
])

// Fill shape's color
triangle.endFill()

// Position the triangle after you've drawn it.
// The triangle's x/y position is anchored to its first point in the path
triangle.x = 180
triangle.y = 22

app.stage.addChild(triangle)

let style = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fill: 'white',
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  align: 'center',
  wordWrap: true,
  wordWrapWidth: 300
})
let message = new Text('Hello Pixi!', style)
app.stage.addChild(message)
message.position.set(170, 240)
// message.x = app.stage.width / 2
