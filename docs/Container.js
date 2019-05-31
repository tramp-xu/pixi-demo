
/** Container */ 

  // 分组让你能够让你创建游戏场景，并且像一个单一单元那样管理相似的精灵图。Pixi有一个对象叫 Container，它可以帮你做这些工作。
  //The cat
  let cat = new Sprite(id["cat.png"]);
  cat.position.set(16, 16);

  //The hedgehog
  let hedgehog = new Sprite(id["hedgehog.png"]);
  hedgehog.position.set(32, 32);

  //The tiger
  let tiger = new Sprite(id["tiger.png"]);
  tiger.position.set(64, 64);

  const animals = new PIXI.Container()
  // stage 是最底层容器，所谓的舞台, cat 是精灵图
  animals.addChild(cat);
  animals.addChild(hedgehog);
  animals.addChild(tiger);

  app.stage.addChild(animals);


  // 能在animals分组里找到猫的全局位置
  console.log(animals.toGlobal(cat.position));
  //Displays: Object {x: 80, y: 80...};

  // 这种方式更合适
  tiger.getGlobalPosition().x
  tiger.getGlobalPosition().y

  // 相对位置
  sprite.toLocal(sprite.position, anyOtherSprite)
  // 如下
  tiger.toLocal(tiger.position, hedgehog).x
  tiger.toLocal(tiger.position, hedgehog).y