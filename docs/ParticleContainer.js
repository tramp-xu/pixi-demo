
/** ParticleContainer */ 

// 任何在 ParticleContainer 里的精灵都会比在一个普通的Container的渲染速度快2到5倍

let superFastSprites = new PIXI.particles.ParticleContainer();
// ParticleContainer 对象只包含 x, y, width, height, scale, pivot, alpha, visible 这些属性

let superFastSprites = new ParticleContainer(maxSize, properties, batchSize, autoResize);

//  配置参数是一个拥有五个布尔值的对象：scale, position, rotation, uvs 和 alpha。默认的值是 position 为 true，
// 其他都为 false。这意味着如果你想在 ParticleContainer 改变精灵的rotation, scale, alpha, 或者 uvs，你得先把这些属性设置为 true

/**
maxSize: 默认 1500
properties: {
  rotation: true,
  alphaAndtint: true,
  scale: true,
  uvs: true // uvs 是什么呢？只有当它们在动画时需要改变它们纹理子图像的时候你需要设置它为 true 。
}
 */