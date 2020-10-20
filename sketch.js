var monkey , monkey_running;
var banana,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score = 0;
var END= 0;
var PLAY= 1;
var gameState= PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,400);
  
  monkey= createSprite(75,315,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  ground= createSprite(300,335,1500,10);
  ground.velocityX=-4;
  ground.x= ground.width /2;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("white");
  if(gameState===PLAY){
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
     spawnBanana();
     spawnObstacle();
    if(keyDown("space")&& monkey.y >= 290) {
        monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(foodGroup)){
       foodGroup.destroyEach();
       score=score+2;
    }
    if(monkey.isTouching(obstacleGroup)){
       gameState=END;
       }
  }
  if(gameState===END){
    ground.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
    gameState=PLAY;
  }
  text("FoodEaten =",250,50);
  text(score,320,50);
  monkey.collide(ground);
  drawSprites();
}
function spawnBanana(){ 
  if(frameCount%100===0){
    var banana= createSprite(600,150,10,10);
    banana.y=Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale=0.09;
    banana.velocityX=-4;
    foodGroup.add(banana);
  }
}

function spawnObstacle(){ 
  if(frameCount%150===0){
    var obstacle= createSprite(600,305,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.13;
    obstacle.velocityX=-5;
    obstacleGroup.add(obstacle);
  }
}