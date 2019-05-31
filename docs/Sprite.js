/** Sprite */ 

// TextureCache 纹理
let texture = PIXI.utils.TextureCache["images/cat.png"];
let sprite = new PIXI.Sprite(texture);

// 把精灵的visible属性设置成false来让精灵简单的隐藏
sprite.visible = false
// 设置精灵坐标的x和y:
sprite.position.set(x, y)
// 设置精灵缩放
sprite.scale.set(0.5, 0.5);
// 旋转。
sprite.rotation = 0.5

// anchor 和 pivot的不同之处在哪里呢？他们真的很像！anchor改变了精灵纹理的图像原点，用0到1的数据来填充。pivot则改变了精灵的原点，用像素的值来填充。你要用哪个取决于你。两个都试试就知道哪个对你而言最适合。
// 设置纹理旋转锚点
cat.anchor.set(x, y)
// 设置精灵图旋转锚点
cat.pivot.set(x, y)