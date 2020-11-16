var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var scoreDone = false;
var turn = 0;
var gameState = "start";
var score =0;

var divisionHeight=300;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 

function play() {
  for (var i = 0; i < plinkos.length; i++) {
     
    plinkos[i].display();
    
  }

 //  if(frameCount%60===0){
 //    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
 //    score++;
 // }

 for (var j = 0; j < particles.length; j++) {
  
    particles[j].display();
  }

 // particle.display();

  for (var k = 0; k < divisions.length; k++) {
    
    divisions[k].display();
  }
  //drawing score
  text("Score: " + score + "         Turn: "+turn, 40, 20 )

  text("100", 30, 500)
  text("100", 110, 500)
  text("100", 180, 500)
  text("500", 260, 500)
  text("500", 340, 500)
  text("500", 420, 500)
  text("1000", 500, 500)
  text("1000", 580, 500)
  text("1000", 660, 500)
  text("2000", 740, 500)

 if (!scoreDone && particles[4] != null) {
   if(particles[4].body.position.y > 760){
     scoreDone = true
     for (var ball = 0; ball < 5; ball++) {
           if(particles[ball].body.position.x > 0 && particles[ball].body.position.x < 240){score = score + 100;}
           if(particles[ball].body.position.x > 240 && particles[ball].body.position.x < 480){score = score + 500;}
           if(particles[ball].body.position.x > 480 && particles[ball].body.position.x < 720){score = score + 1000;}
           if(particles[ball].body.position.x > 720 && particles[ball].body.position.x < 800){score = score + 2000;}
           gameState = "end";
     }
   }
 }

}


function draw() {
  background("black");
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
  if (gameState == "start") {
    fill("white");
    textSize(30)
    text("TO START, CLICK MOUSE", 150, 650);
    textSize(30);
    text("this is the plinko game", 150, 150);
    text("you have to make the balls fall in the buckets", 150, 250);
    text("get as many points as you can", 150, 350);
    text("click the mouse where you want the balls to fall", 150, 450);
    text("good luck!", 150, 550);}
    
    if (gameState == "play") {play();}
  if(gameState == "end"){
    fill("white");
    textSize(40)
    text("GOOD JOB!", 300, 300)
    text("YOUR SCORE IS: "+ score, 200,400 )
    text("CLICK MOUSE TO RESTART", 150, 500)
    
  }

  
 }

function mousePressed(){
  if (gameState == "start") {gameState = "play"}
  else {
  if(gameState != "end" && turn < 5){
     turn++;
   particles.push(new Particle(mouseX, 10, 10, 10)); 
   }}
  if(gameState == "end"){
     particles = [];
     //plinkos = [];
    // divisions = [];

     scoreDone = false;
     turn = 0;
     gameState = "start";
     score =0;
  }
}