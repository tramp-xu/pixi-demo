
/** 资源 */ 

// Pixi强大的loader对象可以加载任何你需要种类的图像资源
PIXI.loader.add(['1.png', '2.png']).load((loader, resources) => {
  // resources 是所有加载完的资源, 某个资源的 texture 为其纹理
  let cat = new Sprite(resources["images/cat.png"].texture);
  //Add the cat to the stage
  app.stage.addChild(cat);
})

PIXI.loader
  .add([
    "images/one.png",
    "images/two.png",
    "images/three.png"
  ])
  .on("progress", loadProgressHandler) // 加载过程回调
  .load(setup);

// 可以依照这个做进度条
function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

function setup() {
  console.log("All files loaded");
}

// 调用加载器的reset方法
PIXI.loader.reset();

// 使用 TexturePacker 软件构建雪碧图, 会生成 json 文件
app.loader.add('/static/images/example.json').load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  let id = resources['/static/images/example.json'].textures
  // Tell the texture to use that rectangular section
  let sprite = new Sprite(id['blob.png'])

  // Add the rocket to the stage
  app.stage.addChild(sprite)

  // Render the stage
  app.renderer.render(app.stage)
})



// 不建议
// add(name, uri) 方法 name：资源名称 uri: 资源路径 然而，建议永远别用这个操作！因为将不得不记住你所有加载文件的别名
PIXI.loader.add("catImage", "images/cat.png").load(setup);
