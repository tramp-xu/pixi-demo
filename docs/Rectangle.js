
/** Rectangle */ 

// 前两个参数定义了x 和y轴坐标位置，后两个参数定义了矩形的width 和 height
let rectangle = new PIXI.Rectangle(x, y, width, height);

// rectangle 矩形实例对象仅仅是一个数据对象， 如下是一种方式,  texture 为纹理
let rectangle = new Rectangle(192, 128, 64, 64);
texture.frame = rectangle;
let rocket = new Sprite(texture);