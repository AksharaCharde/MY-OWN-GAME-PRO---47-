var player;
var girl_running;
var bg, bgImage;
var ghost, ghostImg, treasureImg;
var ghostGroup, treasureGroup, spawnObject;
var edges, path;
var gameOver, restart, gameOverImg, restartImg;

var PLAY = 1;
var END = 0;
var gameState = 1;

var distance = 0;
var score = 0;

function preload() {
    girl_running = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png",
        "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png",
        "Run (9).png", "Run (10).png", "Run (11).png", "Run (12).png", "Run (14).png",
        "Run (15).png", "Run (16).png", "Run (17).png",
        "Run (18).png", "Run (19).png", "Run (20).png");
    bgImage = loadImage("bg.jpeg");
    ghostImage = loadImage("ghost-standing.png");
    treasureImg = loadImage("treasure.png");

    gameOverImg = loadImage("GOI-removebg-preview.png");
    restartImg = loadImage("RI.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    path = createSprite(displayWidth/2-10, displayHeight/2-20, 20, 20);
    path.addImage(bgImage);
    path.scale = 1;

    player = createSprite(100, 588, 10, 10);
    player.addAnimation("girl_running", girl_running);
    player.scale = 0.3;

    ghostGroup = new Group();
    treasureGroup = new Group();

    gameOver = createSprite(650, 150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.7;
    gameOver.visible = false;

    restart = createSprite(650, 220);
    restart.addImage(restartImg);
    restart.scale = 0.8;
    restart.visible = false;
    
}

function draw() {
    background(0);

    if(gameState === PLAY){
      player.y = World.mouseY;

      edges = createEdgeSprites();
      player.collide(edges);

      spawnObject = Math.round(random(1, 2));
    if(World.frameCount % 200 === 0){
      if(spawnObject === 1){
        spawnGhost();
      }
      else{
        spawnTreasure();
      }
    }

    if(ghostGroup.isTouching(player))
    {
      gameState = END;
    }

    else if(treasureGroup.isTouching(player))
    {
      treasureGroup.destroyEach();
      score = score + 10;
    }
    if (gameState === END)
    {
      gameOver.visible = true;
      restart.visible = true;

      treasureGroup.destroyEach();
      ghostGroup.destroyEach();
      treasureGroup.setVelocityEach(0);
      ghostGroup.setVelocityEach(0);

      if(mousePressedOver(restart)){
        reset();
      }
    }

    }
    drawSprites();

    textSize(20);
    fill(255);
    text("Score = " + score, width-500, 30);
}

function spawnGhost() {
    //write code here to spawn the ghost
    
      var ghost = createSprite(random(500, 1100),random(500,700), 35, 35);
      ghost.addImage(ghostImage);
      ghost.scale = 0.5;
      ghost.velocityX = -5;

      ghost.debug = true;
      ghost.setCollider("rectangle", 0, 0, 200, 200);
      
       //assign lifetime to the variable
      ghost.lifetime = 400;
      
      //add each cloud to the group
      ghostGroup.add(ghost);
  
    
  }

  function spawnTreasure() {
    //write code here to spawn the ghost
 
      var treasure = createSprite(random(500, 1100),random(500,700), 40, 10);
      treasure.addImage(treasureImg);
      treasure.scale = 0.5;
      treasure.velocityX = -(6 + 2 * distance/150);

      treasure.debug = true;
      treasure.setCollider("rectangle", 0, 0, 200, 200);
      
       //assign lifetime to the variable
       treasure.lifetime = 400;
      
      //add each cloud to the group
      treasureGroup.add(treasure);
    
    
  }

  function reset(){
    gameState = PLAY;
    
    score = 0;
    gameOver = false;
    restart = false;

    treasureGroup.destroyEach();
    ghostGroup.destroyEach();

  }