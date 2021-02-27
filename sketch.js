var PLAY=1;
var END=0;
var SERVE;
gameState=SERVE;
var submarine, submarineImg;
var background, backgroundImg;
var virus, virusImg,virusGroup;
var alien, alienImg,aliensGroup;
var potion,potionImg,potionsGroup
var gameover,gameoverImg;
var getready,getreadyImg;
var edges;
var death=0
var treasureCollection = 0;



function preload(){
  submarineImg = loadImage("submarine.png");
 // missileImg = loadImage("missile.jpg");
  virusImg = loadImage("virus.png");
  backgroundImg = loadImage("underwater background.jpg");
  alienImg=loadImage("alien.png");
  potionImg=loadImage("potion.png")
  gameoverImg=loadImage("game over.png");
  getreadyImg=loadImage("get ready.png");
}



function setup() {
  createCanvas(1200,400);

  background = createSprite(0,0,1200,400);
  background.addImage(backgroundImg);
  background.scale = 1

  submarine = createSprite(100, 200, 50, 50);
  submarine.addImage("submarine",submarineImg);
  submarine.scale = 0.2;

  getready= createSprite(500,200);
  getready.addImage(getreadyImg);
getreadyImg.visible=false;
submarine.visible=false;

gameover=createSprite(600,200);
gameover.addImage(gameoverImg);
gameoverImg.visible=false;


virusGroup=new Group();
aliensGroup= new Group();
potionsGroup= new Group();

edges= createEdgeSprites();
}

function draw() {
//background("white")


if(gameState===SERVE){
  getreadyImg.visible=true;
  gameover.visible=false;

  if(keyDown("space")){
    gameState= PLAY;
    submarine.visible=true;
    getready.visible=false;
    gameover.visible=false
  }

}

  if(gameState === PLAY){
    // moving ground
    background.velocityX = -3 

    
    if (background.x < 0){
      background.x = background.width/2;
    }
gameoverImg.visible=false;


  if(keyDown(UP_ARROW)){
    submarine.y = submarine.y - 1;
  }
  if(keyDown(DOWN_ARROW)){
    submarine.y = submarine.y + 1;
  }
  if(keyDown(LEFT_ARROW)){
    submarine.x = submarine.x - 2;
  }
  if(keyDown(RIGHT_ARROW)){
    submarine.x = submarine.x + 2;
  }

  
  spawnvirus();
  spawnalien();
  spawnpotion();
}
if (potionsGroup.isTouching(submarine)) {
  potionsGroup.destroyEach();
  treasureCollection=treasureCollection+100;
}
if(virusGroup.isTouching(submarine)|| aliensGroup.isTouching(submarine)){
  gameState= END;
  death=death+1;

}
   else if(gameState=== END){
background.velocityX=0;
gameover.visible=true;
submarine.visible=false
virusGroup.destroyEach();
aliensGroup.destroyEach();
potionsGroup.destroyEach();
virusGroup.setLifetimeEach(0);
aliensGroup.setLifetimeEach(0);
potionsGroup.setLifetimeEach(0)

if(keyDown("R")){
  reset();
}
   }

   submarine.collide(edges);
  drawSprites();
  stroke("orange");
  fill("white");
  textSize(10);
  text("YOU DIED:" + death,1000,50);
  stroke("gold");
  fill("white");
  textSize(10);
  text("YOU GOT:" + treasureCollection,1000,40);

}

function reset(){
gameState = PLAY;
submarine.visible = true
getreadyImg.visible = true;
gameover.visible = false;
potionsGroup.destroyEach();
  virusGroup.destroyEach();
  aliensGroup.destroyEach();

  death = 0;
  treasureCollection=0

}
function spawnvirus(){
if(frameCount % 70 === 0){
  var virus = createSprite(1200,120,20,20);

  virus.velocityX = -5;
virus.y = Math.round(random(10,240));
  virus.addImage(virusImg);
virus.scale = 0.15;
virus.lifetime = 300;
virusGroup.add(virus)
}

}

function spawnalien(){
  if(frameCount % 30 === 0){
    var alien = createSprite(0,120,20,20);
  
    alien.velocityY = 5;
    alien.x=Math.round(random(10,1100))
  alien.y = Math.round(random(10,240));
    alien.addImage(alienImg);
  alien.scale = 0.15;
  alien.lifetime = 300;

  aliensGroup.add(alien)
}
}

function spawnpotion(){
  if(frameCount % 60 === 0){
    var potion = createSprite(0,120,20,20);
  
    //potion.velocityY = 5;
    potion.x=Math.round(random(10,1100))
    potion.addImage(potionImg);
    potion.scale = 0.15;
    potion.lifetime = 300;

  potionsGroup.add(potion)
}
}