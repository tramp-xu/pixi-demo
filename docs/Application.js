
/** Application */ 

  const app = new PIXI.Application({})
  // stage 是最底层容器，所谓的舞台, cat 是精灵图
  app.stage.addChild(cat) // 添加
  app.stage.removeChild(anySprite) // 删除


  // 动画
  function gameLoop (delta) {
    // Move the cat 1 pixel
    explorer.vx = 1
    explorer.vy = 1
    explorer.x += explorer.vx
    explorer.y += explorer.vy
  }
  app.ticker.add(delta => gameLoop(delta))
  