var player;
var road,roadImg;
var leftBlock,rightBlock;
var enemyGroup;
var gameState = 0;
var score = 0;
var lifeImg;
var lives = 3;

function preload(){
  roadImg = loadImage("road3.png");
  lifeImg = loadImage("life.png");
}

function setup() {
  createCanvas(530,720);

  road = createSprite(265,360);
  road.addImage("road",roadImg);
  road.scale = 5;

  leftBlock = createSprite(0,360,10,720);
  rightBlock = createSprite(530,360,10,720);

  leftBlock.visible = false;
  rightBlock.visible = false;

  player = new Car(400,570);
  
  enemyGroup = new Group();

  life1 = createSprite(175,690);
  life1.addImage("life1",lifeImg);
  life1.scale = 0.08;

  life2 = createSprite(250,690);
  life2.addImage("life1",lifeImg);
  life2.scale = 0.08;

  life3 = createSprite(325,690);
  life3.addImage("life1",lifeImg);
  life3.scale = 0.08;
}

function draw() {
  background("white"); 
  
  player.car.bounceOff(leftBlock);
  player.car.bounceOff(rightBlock);

  if(gameState===0){
    player.car.visible = true;
    road.visible = true;

    road.velocityY = 6;

    if(road.y>720){
      road.y = road.height/2;
    }

    /*if(player.car.collide(enemyGroup) && lives===3){
      lives-=1;
      life1.visible = false;
    }
    
    if(player.car.collide(enemyGroup) && lives===2){
      lives-=1;
      life2.visible = false;
    }
    
    if(player.car.collide(enemyGroup) && lives===1){
      lives-=1;
      life3.visible = false;
    }

    if(lives===0){
      gameState = 1;
    }*/

    if(frameCount%40===0){
      spawnEnemy();
    }

    if(player.car.bounceOff(enemyGroup)){
      gameState=1;
    }

    score = score + Math.round(getFrameRate()/60);
  }

  if(gameState===1){
    player.car.velocityY = 0;
    player.car.velocityX= 0;
    enemyGroup.destroyEach();
    player.car.visible = false;
    road.visible = false;
    push();
    fill("black");
    textSize(25);
    textFont("Georgia");
    text("Game Over",180,360);
    text("Press R to restart",180,400);
    text("Your Score: "+score,180,440);
    pop();
  }

  drawSprites();

  push();
  fill("white");
  textSize(25);
  textFont("Georgia");
  text("Score: "+score,50,75);
  pop();
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    player.car.velocityX = -6;
  }
  if(keyCode === RIGHT_ARROW){
    player.car.velocityX = +6;
  }

  if(gameState===1 && keyCode === 82){
    gameState = 0;
    score = 0;
    lives = 3;
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
  }
}

function spawnEnemy(){
  enemy = new Enemy(random(50,450),0);
  enemy.enemy.velocityY = 15;
  enemyGroup.add(enemy.enemy);
}