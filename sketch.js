var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path, boy, cash, diamonds, jwellery, sword, end
var  roadImg, boyImg, cashImg, diamondsImg, jwelleryImg, endImg,swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;


function preload() {
  roadImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  // Moving background
  path = createSprite( width/2,200 );
  path.addImage(roadImg);



  //creating boy running
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);

  if (gameState === PLAY) {
    //move the ground
    path.velocityY=4;
    //scoring


    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50
    }

    if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100
    }
    if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 150
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (swordGroup.isTouching(boy)) {
      gameState = END;
      boy.changeAnimation("SahilRunning", endImg);
    }


  } else if (gameState === END) {
    path.velocityY = 0;
    

  }

  boy.x = World.mouseX;

  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > height) {
    path.y = height / 2;
  }



  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();

  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();

  } else {
    if (swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
    }
  }

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    cash.addImage("cash",cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 250;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    diamonds.addImage("diamonds",diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 250;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    jwellery.addImage("jwellery",jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 250;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    sword.addImage("sword",swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 250;
    swordGroup.add(sword);
  }
}
