export function setup (loader, resources, state, play, app) {
  state = play

  // Start the game loop
  app.ticker.add(delta => gameLoop(delta))
}

export function gameLoop (delta) {
  // Runs the current game `state` in a loop and renders the sprites
}

export function play (delta) {
  // All the game logic goes here
}

export function end () {
  // All the code that should run at the end of the game
}
