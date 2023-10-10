var pontuação = 0;
var ground, groundimg;
var invisibleground;
var cloudimg, cloud;
var trex, trexrunning;
var cacto, cactoimg1, cactoimg2, cactoimg3, cactoimg4, cactoimg5, cactoimg6;
var score = 0;
var record = 0;
var play = 1;
var end = 0;
var gamestate = play;
var cactogroup, cloudgroup;

//preload carrega as midías do jogo 
function preload() {
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundimg = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  cactoimg1 = loadImage("obstacle1.png");
  cactoimg2 = loadImage("obstacle2.png");
  cactoimg3 = loadImage("obstacle3.png");
  cactoimg4 = loadImage("obstacle4.png");
  cactoimg5 = loadImage("obstacle5.png");
  cactoimg6 = loadImage("obstacle6.png");
}

//setup faz a aconfiguração
function setup() {
  createCanvas(600, 200);
  // criando as bordas

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trexrunning)
  trex.scale = 0.5;

  ground = createSprite(300, 190, 600, 2);
  ground.addImage("ground", groundimg);

  invisibleground = createSprite(45, 200, 20, 20);
  invisibleground.visible = false;

  cactogroup = new Group();
  cloudgroup = new Group();
}

//draw faz o movimento, a ação do jogo
function draw() {
  background("#f0f9f7");
  if (trex.isTouching(cactogroup)) {
    gamestate = end;
  }
  if (gamestate === play) {

    score = Math.round(frameCount / 5);

    ground.velocityX = -6;

    if (ground.x <= -600) {
      ground.x = 588;
    }

    if (trex.collide(invisibleground)) {
      if (keyWentDown("space")) {
        trex.velocityY = -10;
      }
    }

    
    createCactus();
  }

  if (gamestate === end) {
    ground.velocityX = 0;





  }

  createClouds();

  trex.velocityY += 0.5;

  trex.collide(invisibleground);

  text("Pontuação: " + score, 450, 20);
  text("Recorde: " + record, 450, 40);

  //coordenadas do mouse na tela
  text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);

  drawSprites();
}

function createClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, random(14, 100), 40, 10);
    cloud.velocityX = -3;
    cloud.addImage(cloudimg);
    cloud.scale = random(0.3, 1.4);
    cloud.depth = trex.depth - 1;
    cloud.lifetime = 220;
    cloudgroup.add(cloud)
  }

}

function createCactus() {
  if (frameCount % 100 === 0) {
    cacto = createSprite(600, 175, 10, 50);
    cacto.velocityX = -6;
    cacto.scale = 0.5;
    cacto.depth = trex.depth;
    cacto.lifetime = 220;
    cactogroup.add(cacto)
    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoimg1)
        break;
      case 2: cacto.addImage(cactoimg2)
        break;
      case 3: cacto.addImage(cactoimg3)
        break;
      case 4: cacto.addImage(cactoimg6)
        break;
      case 5: cacto.addImage(cactoimg5)
        break;
      case 6: cacto.addImage(cactoimg6)
        break;
    }
  }
}