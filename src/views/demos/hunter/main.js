// import { Application, utils, Sprite, Text, loader, Container, resources, Graphics, TextStyle } from '@/utils/constant'
import * as PIXI from 'pixi.js'
import { keyboard, hitTestRectangle, randomInt } from '@/utils/tools'

let Application = PIXI.Application
let Container = PIXI.Container
// let loader = PIXI.loader
// let resources = PIXI.loader.resources
let Graphics = PIXI.Graphics
// let TextureCache = PIXI.utils.TextureCache
let Sprite = PIXI.Sprite
let Text = PIXI.Text
let TextStyle = PIXI.TextStyle

let app = new Application({
  width: 512,
  height: 512,
  antialiasing: true,
  transparent: false,
  resolution: 1
})

document.body.append(app.view)

app.loader.add('/static/images/treasureHunter.json').load((loaders, resources) => setup(loaders, resources))

let state, explorer, treasure, blobs, dungeon,
  door, healthBar, message, gameScene, gameOverScene, id

function setup (loaders, resources) {
  // Make the game scene and add it to the stage
  gameScene = new Container()
  app.stage.addChild(gameScene)
  // Make the sprites and add them to the `gameScene`
  // Create an alias for the texture atlas frame ids
  id = resources['/static/images/treasureHunter.json'].textures
  // Dungeon
  dungeon = new Sprite(id['dungeon.png'])
  gameScene.addChild(dungeon)
  // Door
  door = new Sprite(id['door.png'])
  door.position.set(32, 0)
  gameScene.addChild(door)
  // Explorer
  explorer = new Sprite(id['explorer.png'])
  explorer.x = 68
  explorer.y = gameScene.height / 2 - explorer.height / 2
  explorer.vx = 0
  explorer.vy = 0
  gameScene.addChild(explorer)

  // Treasure
  treasure = new Sprite(id['treasure.png'])
  treasure.x = gameScene.width - treasure.width - 48
  treasure.y = gameScene.height / 2 - treasure.height / 2
  gameScene.addChild(treasure)
  // Make the blobs
  let numberOfBlobs = 6
  let spacing = 48
  let xOffset = 150
  let speed = 2
  let direction = 1
  // An array to store all the blob monsters
  blobs = []
  // Make as many blobs as there are `numberOfBlobs`
  for (let i = 0; i < numberOfBlobs; i++) {
    // Make a blob
    let blob = new Sprite(id['blob.png'])
    // Space each blob horizontally according to the `spacing` value.
    // `xOffset` determines the point from the left of the screen
    // at which the first blob should be added
    let x = spacing * i + xOffset
    // Give the blob a random y position
    let y = randomInt(0, app.stage.height - blob.height)
    // Set the blob's position
    blob.x = x
    blob.y = y
    // Set the blob's vertical velocity. `direction` will be either `1` or
    // `-1`. `1` means the enemy will move down and `-1` means the blob will
    // move up. Multiplying `direction` by `speed` determines the blob's
    // vertical direction
    blob.vy = speed * direction
    // Reverse the direction for the next blob
    direction *= -1
    // Push the blob into the `blobs` array
    blobs.push(blob)
    // Add the blob to the `gameScene`
    gameScene.addChild(blob)
  }
  // Create the health bar
  healthBar = new Container()
  healthBar.position.set(app.stage.width - 170, 4)
  gameScene.addChild(healthBar)
  // Create the black background rectangle
  let innerBar = new Graphics()
  innerBar.beginFill(0x000000)
  innerBar.drawRect(0, 0, 128, 8)
  innerBar.endFill()
  healthBar.addChild(innerBar)
  // Create the front red rectangle
  let outerBar = new Graphics()
  outerBar.beginFill(0xFF3300)
  outerBar.drawRect(0, 0, 128, 8)
  outerBar.endFill()
  healthBar.addChild(outerBar)
  healthBar.outer = outerBar
  // Create the `gameOver` scene
  gameOverScene = new Container()
  app.stage.addChild(gameOverScene)
  // Make the `gameOver` scene invisible when the game first starts
  gameOverScene.visible = false
  // Create the text sprite and add it to the `gameOver` scene
  let style = new TextStyle({
    fontFamily: 'Futura',
    fontSize: 64,
    fill: 'white'
  })
  message = new Text('The End!', style)
  message.x = 120
  message.y = app.stage.height / 2 - 32
  gameOverScene.addChild(message)
  // Capture the keyboard arrow keys
  let left = keyboard(37)
  let up = keyboard(38)
  let right = keyboard(39)
  let down = keyboard(40)
  // Left arrow key `press` method
  left.press = function () {
    // Change the explorer's velocity when the key is pressed
    explorer.vx = -5
    explorer.vy = 0
  }
  // Left arrow key `release` method
  left.release = function () {
    // If the left arrow has been released, and the right arrow isn't down,
    // and the explorer isn't moving vertically:
    // Stop the explorer
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }
  // Up
  up.press = function () {
    explorer.vy = -5
    explorer.vx = 0
  }
  up.release = function () {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }
  // Right
  right.press = function () {
    explorer.vx = 5
    explorer.vy = 0
  }
  right.release = function () {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }
  // Down
  down.press = function () {
    explorer.vy = 5
    explorer.vx = 0
  }
  down.release = function () {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }
  // Set the game state
  state = play

  // Start the game loop
  app.ticker.add(delta => gameLoop(delta))
}
function gameLoop (delta) {
  // Update the current game state:
  state(delta)
}
function play (delta) {
  // use the explorer's velocity to make it move
  explorer.x += explorer.vx
  explorer.y += explorer.vy
  // Contain the explorer inside the area of the dungeon
  contain(explorer, { x: 28, y: 10, width: 488, height: 480 })
  // contain(explorer, stage);
  // Set `explorerHit` to `false` before checking for a collision
  let explorerHit = false
  // Loop through all the sprites in the `enemies` array
  blobs.forEach(function (blob) {
    // Move the blob
    blob.y += blob.vy
    // Check the blob's screen boundaries
    let blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 480 })
    // If the blob hits the top or bottom of the stage, reverse
    // its direction
    if (blobHitsWall === 'top' || blobHitsWall === 'bottom') {
      blob.vy *= -1
    }
    // Test for a collision. If any of the enemies are touching
    // the explorer, set `explorerHit` to `true`
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true
    }
  })
  // If the explorer is hit...
  if (explorerHit) {
    // Make the explorer semi-transparent
    explorer.alpha = 0.5
    // Reduce the width of the health bar's inner rectangle by 1 pixel
    healthBar.outer.width -= 1
  } else {
    // Make the explorer fully opaque (non-transparent) if it hasn't been hit
    explorer.alpha = 1
  }
  // Check for a collision between the explorer and the treasure
  if (hitTestRectangle(explorer, treasure)) {
    // If the treasure is touching the explorer, center it over the explorer
    treasure.x = explorer.x + 8
    treasure.y = explorer.y + 8
  }
  // Does the explorer have enough health? If the width of the `innerBar`
  // is less than zero, end the game and display "You lost!"
  if (healthBar.outer.width < 0) {
    state = end
    message.text = 'You lost!'
  }
  // If the explorer has brought the treasure to the exit,
  // end the game and display "You won!"
  if (hitTestRectangle(treasure, door)) {
    state = end
    message.text = 'You won!'
  }
}
function end () {
  gameScene.visible = false
  gameOverScene.visible = true
}
/* Helper functions */
function contain (sprite, container) {
  let collision
  // Left
  if (sprite.x < container.x) {
    sprite.x = container.x
    collision = 'left'
  }
  // Top
  if (sprite.y < container.y) {
    sprite.y = container.y
    collision = 'top'
  }
  // Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width
    collision = 'right'
  }
  // Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height
    collision = 'bottom'
  }
  // Return the `collision` value
  return collision
}
