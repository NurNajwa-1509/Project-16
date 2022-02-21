//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload()
{
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}

function setup() 
{
  createCanvas(500, 500);
  
  //creating sword
   knife = createSprite(40,380,20,20);
   knife.addImage(knifeImage);
   knife.scale = 0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() 
{
  background("lightblue");
  
  if(gameState === PLAY)
  {
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife))
    {
      fruitGroup.destroyEach();  
      knifeSwooshSound.play();
      score = score +2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife))
      {
        gameState = END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale = 1.5;
        knife.x = 230;
        knife.y = 250;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,180,50);
}

function Monster()
{
  if(World.frameCount % 390 === 0)
  {
    monster = createSprite(250,380,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,267));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50; 
    monsterGroup.add(monster);
  }
}

function fruits()
{
  if(World.frameCount % 80 === 0)
  {
    fruit = createSprite(200,330,20,20);
    fruit.x = 0    
  //Increase the velocity of fruit after score 4 
    fruit.velocityX = (7+(score/4));
    fruit.scale = 0.2;

     r = Math.round(random(1,4));
    if (r == 1) 
    {
      fruit.addImage(fruit1);
    } else if (r == 2) 
    {
      fruit.addImage(fruit2);
    } else if (r == 3) 
    {
      fruit.addImage(fruit3);
    } else 
    {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,400));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}