import { Application, utils, Sprite } from '@/utils/constant'
import { randomInt, keyboard } from '@/utils/tools'

let type = 'WebGL'
if (!utils.isWebGLSupported()) {
  type = 'canvas'
}

utils.sayHello(type)

const app = new Application({
  width: 512,
  height: 512,
  antialias: true,
  transparent: false,
  resolution: 1
})
document.body.appendChild(app.view)

let explorer = null
let state = null

app.loader.add('/static/images/treasureHunter.json').load((loader, resources) => {
  let id = resources['/static/images/treasureHunter.json'].textures
  // Tell the texture to use that rectangular section
  let dungeon = new Sprite(id['dungeon.png'])
  app.stage.addChild(dungeon)

  let door = new Sprite(id['door.png'])
  door.position.set(32, 0)
  app.stage.addChild(door)

  explorer = new Sprite(id['explorer.png'])
  explorer.x = 68
  explorer.y = app.stage.height / 2 - explorer.height / 2
  explorer.vx = 0
  explorer.vy = 0

  app.stage.addChild(explorer)

  let treasure = new Sprite(id['treasure.png'])
  treasure.x = app.stage.width - treasure.width - 48
  treasure.y = app.stage.height / 2 - treasure.height / 2
  app.stage.addChild(treasure)

  // Make the blobs
  let numberOfBlobs = 6
  let spacing = 48
  let xOffset = 150

  // Make as many blobs as there are `numberOfBlobs`
  for (let i = 0; i < numberOfBlobs; i++) {
    // Make a blob
    let blob = new Sprite(id['blob.png'])

    // Space each blob horizontally according to the `spacing` value.
    // `xOffset` determines the point from the left of the screen
    // at which the first blob should be added.
    let x = spacing * i + xOffset

    // Give the blob a random y position
    // (`randomInt` is a custom function - see below)
    let y = randomInt(0, app.stage.height - blob.height)

    // Set the blob's position
    blob.x = x
    blob.y = y

    // Add the blob sprite to the stage
    app.stage.addChild(blob)
  }

  // Render the stage
  app.renderer.render(app.stage)

  let left = keyboard(37)
  let up = keyboard(38)
  let right = keyboard(39)
  let down = keyboard(40)

  // Left arrow key `press` method
  left.press = () => {
    // Change the explorer's velocity when the key is pressed
    explorer.vx = -2
    explorer.vy = 0
  }

  // Left arrow key `release` method
  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down,
    // and the explorer isn't moving vertically:
    // Stop the explorer
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }

  // Up
  up.press = () => {
    explorer.vy = -2
    explorer.vx = 0
  }
  up.release = () => {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }

  // Right
  right.press = () => {
    explorer.vx = 2
    explorer.vy = 0
  }
  right.release = () => {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }

  // Down
  down.press = () => {
    explorer.vy = 2
    explorer.vx = 0
  }
  down.release = () => {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }

  state = play
  app.ticker.add(delta => gameLoop(delta))
})

function gameLoop (delta) {
  state(delta)
}

function play (delta) {
  explorer.x += explorer.vx
  explorer.y += explorer.vy
}
