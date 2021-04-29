var player;
var gr;
var platformGr,treeGr,barrelGr,boxGr,BulletGr,acidGr,spikeGr,sbulGr,healthtokenGr;
var bg;
var fly;
var score,lives,health,bullet,points;
var platform,tree,barrel,box,spike,water,acid,zombie,sbul,healthtoken;
var gameState=0
var helpButton,back,help
function preload()
{
barImg=loadImage("Barrel (1).png");
fly=loadAnimation("Fly (1).png","Fly (2).png");
bg=loadImage("BG.png");
pl=loadImage("14.png");
tr1=loadImage("Tree_2.png");
tr2=loadImage("Tree_3.png");
grImg=loadImage("groundImage.png"); 
boxImg=loadImage("Crate.png");
spikeImg=loadImage("Spike.png");
waterImg=loadImage("17.png");
acidImg=loadImage("Acid (1).png");
ammoPic=loadImage("ammo.png");
zAni=loadAnimation("zombie/Idle (1).png","zombie/Idle (2).png","zombie/Idle (3).png","zombie/Idle (4).png","zombie/Idle (5).png","zombie/Idle (6).png","zombie/Idle (7).png","zombie/Idle (8).png","zombie/Idle (9).png","zombie/Idle (10).png","zombie/Idle (11).png","zombie/Idle (12).png","zombie/Idle (13).png","zombie/Idle (14).png","zombie/Idle (15).png")
bAni=loadAnimation("Bullet_000.png","Bullet_001.png","Bullet_002.png","Bullet_003.png","Bullet_004.png");
coImg=loadImage("coin(sp).png");
pointSound=loadSound("pointrim.mp3");
zDed=loadSound("zdead.mp3");
boxbreak=loadSound("box broke.mp3");
hitSound=loadSound("hit-.mp3");
punchSound=loadSound("punch.mp3");
explotion=loadSound("tnt.mp3");
reload=loadSound("reload.mp3");
shoot=loadSound("gun shot-.mp3");
heart=loadImage("health(sp).png");
heal=loadSound("++.mp3");
gname=loadImage("gameName.png");
pbi=loadImage("play.png");
rbi=loadImage("restart.png");
font1=loadFont("main.ttf");
font2=loadFont("1 (1).ttf");
playerDed=loadImage("Dead (1).png");
go=loadFont("GO.ttf");
sb=loadImage("scoreboard.png");
bgmusic=loadSound("pirates bg music(f).mp3");
howtoplay=loadImage("how to play.png");
hb=loadImage("helpbutton.png");
kill=loadSound("kill sound.mp3");
click=loadSound("click.mp3");
}

function setup() {
	createCanvas(displayWidth,displayHeight-120);



lives=3;
health=100
bullet=3;
points=0;


player=createSprite(200,500,40,40);
player.shapeColor="red";
 player.addAnimation("player",fly);
  player.scale=0.25
gr=createSprite(displayWidth/2+30,displayHeight/2+1150,displayWidth,300);
gr.addImage(grImg);
gr.scale=2


co1=createSprite(1400,random(50,500),30,30);
co1.addImage(coImg);
co1.scale=0.35;
co2=createSprite(1600,random(50,500),30,30);
co2.addImage(coImg);
co2.scale=0.35;
co3=createSprite(1800,random(50,500),30,30);
co3.addImage(coImg);
co3.scale=0.35;
co4=createSprite(2000,random(50,500),30,30);
co4.addImage(coImg);
co4.scale=0.35;
co5=createSprite(2200,random(50,500),30,30);
co5.addImage(coImg);
co5.scale=0.35;


playbutton=createSprite(660,520,100,50);
playbutton.addImage(pbi);

helpButton=createSprite(830,550,100,50);
helpButton.addImage(hb);
helpButton.scale=0.6;

platformGr=new Group();
BulletGr=new Group();
treeGr=new Group();
barrelGr=new Group();
boxGr=new Group();
zombieGr=new Group();
acidGr=new Group();
spikeGr=new Group();
sbulGr=new Group();
healthtokenGr=new Group();
}


function draw() {
  rectMode(CENTER);
   background(bg);




if(gameState===0){

player.visible=false;
co1.visible=false;
co2.visible=false;
co3.visible=false;
co4.visible=false;
co5.visible=false;
image(gname,displayWidth/5,50,800,350);


textSize(90);
textFont(font1);
strokeWeight(2)
stroke("black");
fill("red");
text("AIR ADVENTURER",400,250);



if(mousePressedOver(playbutton)){
gameState=1;
playbutton.destroy();
helpButton.destroy();
click.play();
}

if(mousePressedOver(helpButton)){
help=createSprite(665,330,600,600);
help.addImage(howtoplay);
help.scale=1.1;
help.lifetime=1

}



}


if(gameState===1){

player.visible=true;
co1.visible=true;
co2.visible=true;
co3.visible=true;
co4.visible=true;
co5.visible=true;

Conditions();
Bullets();
Player();
Platforms();
Tree();
Barrel();
Box();
Spikes();
Acid();
Zombie();
 Coins();
DamageSystem();
HealthToken();

gr.velocityX=-(9+6*points/50);
if(gr.x<100){
gr.x=displayWidth/2;
}


if(lives===0){
gameState=2;
}




}


if(gameState===2){

image(gname,displayWidth/5,50,800,350);
player.visible=false;
co1.visible=false;
co2.visible=false;
co3.visible=false;
co4.visible=false;
co5.visible=false;

image(playerDed,560,380,220,160,);
textSize(90);
textFont(go);
strokeWeight(4);
 stroke(0);
fill("purple");
text("GAME OVER",430,190);

textSize(35);
 strokeWeight(2);
 stroke(0);
textFont(font2);
fill("yellow")
text("Points: "+points,460,270);
 if(points<0){
 points=0;
 }

text("Press 'F5' to restart",460,50);
gr.velocityX=0;

}








  drawSprites();
 
}



function Player(){

player.velocityY=player.velocityY+1.2;
if(keyWentDown("UP_ARROW")){
player.velocityY=player.velocityY-18;
}
player.collide(gr);

}


function Platforms(){

if (frameCount%60===0){
platform=createSprite(1400,random(200,450),random(400,560),10);
platform.velocityX=-(9+6*points/50);
platform.addImage(pl);
platform.scale=0.7;
platform.lifetime=200;
 platformGr.add(platform);
}
 player.collide(platformGr);


}


function Tree(){

if (frameCount%800===0){
tree=createSprite(1400,550,20,70);
 tree.velocityX=-(9+6*points/50);
tree.lifetime=200;
tree.addImage(tr1);
tree.scale=0.7;
treeGr.add(tree);
}

 // var rand = Math.round(random(1,2));

//     switch(rand) {

// case 1: tree.addImage(tr2);
//         break;
// case 2: tree.addImage(tr1);
// break;
// default:break;
// }
 

}

function Barrel(){

if (frameCount%180===0){

barrel=createSprite(1400,platform.y-55,50,50)
barrel.velocityX=-(9+6*points/50);
barrel.lifetime=200;
 barrel.addImage(barImg);
barrel.scale=0.3;
barrelGr.add(barrel);
}

 if(sbulGr.isTouching(barrelGr)){
 barrelGr.destroyEach();
explotion.play();
points=points+2;
 }

}

function Box(){

if (frameCount%300===0){

box=createSprite(1400,platform.y-55,50,50)
box.velocityX=-(9+6*points/50);
 box.addImage(boxImg);
box.lifetime=200;
boxGr.add(box);
}
 if(sbulGr.isTouching(boxGr)){
 boxGr.destroyEach();
boxbreak.play();
points=points+2;
 }

}



function Spikes(){

if (frameCount%370===0){

spike=createSprite(1400,600,50,10)
spike.velocityX=-(9+6*points/50);
spike.addImage(spikeImg);
spike.scale=0.3;
spike.lifetime=200;
spikeGr.add(spike);
}



}

function Acid (){

if (frameCount%760===0){

acid=createSprite(1400,675,90,10)
acid.velocityX=-(9+6*points/50);
acid.addImage(acidImg);
// acid.scale=0.3;
acid.lifetime=200;
acidGr.add(acid);
}


}


function Zombie(){

if (frameCount%360===0){

zombie=createSprite(1400,platform.y-100,20,60)
zombie.velocityX=-(9+6*points/50);
zombie.addAnimation("zombie",zAni)
zombie.scale=0.3;
zombie.lifetime=200;
zombieGr.add(zombie);
}
if(zombieGr.isTouching(barrelGr)){
barrelGr.destroyEach();
}
if(zombieGr.isTouching(boxGr)){
boxGr.destroyEach();
}

 if(sbulGr.isTouching(zombieGr)){
 zombieGr.destroyEach();
zDed.play();
points=points+2;
 }

}


function Bullets(){

if (frameCount%140===0){

Bullet=createSprite(1400,random(100,600),20,20);
Bullet.shapeColor="red"
Bullet.velocityX=-(9+5*points/50);
BulletGr.add(Bullet);
 Bullet.addImage(ammoPic);
Bullet.scale=0.16;
Bullet.lifetime=200;
}

if (player.isTouching(BulletGr)){
bullet=bullet+1;
reload.play();
BulletGr.destroyEach();
}

if(bullet > 0){

if(keyCode===32 && frameCount%5===0){

sbul=createSprite(player.x,player.y,30,30);
sbul.velocityX=9+6*points/50;
sbul.addAnimation("sbul",bAni);
sbul.scale=0.2;
sbul.lifetime=80;
sbulGr.add(sbul);
shoot.play();
bullet=bullet-1

}

}


}


function Coins(){




co1.velocityX=-(9+5*points/50);

 co2.velocityX=co1.velocityX
 co3.velocityX=co1.velocityX
 co4.velocityX=co1.velocityX
 co5.velocityX=co1.velocityX



if(player.isTouching(co1)){
co1.x=co1.x+1300;
co1.y=random(50,500);

points=points+1;
pointSound.play();
}
if(player.isTouching(co2)){
co2.x=co2.x+1300;
co2.y=random(50,500);

points=points+1;
pointSound.play();

}
if(player.isTouching(co3)){
co3.x=co3.x+1300;
co3.y=random(50,500);

points=points+1;
pointSound.play();

}
if(player.isTouching(co4)){
co4.x=co4.x+1300;
co4.y=random(50,500);

points=points+1;
pointSound.play();

}
if(player.isTouching(co5)){
co5.x=co5.x+1300;
co1.y=random(50,500);

points=points+1;
pointSound.play();

}


if (co1.x<0){
co1.x=co1.x+1500;
}
if (co2.x<0){
co2.x=co2.x+1500;
}
if (co3.x<0){
co3.x=co3.x+1500;
}if (co4.x<0){
co4.x=co4.x+1500;
}if (co5.x<0){
co5.x=co5.x+1500;
}


 if(points<0){
 points=0;
 }

}

function DamageSystem(){

if(player.velocityX < 0){
health=health-10;
platformGr.destroyEach();
zombieGr.destroyEach();
boxGr.destroyEach();
barrelGr.destroyEach();
hitSound.play();
player.x=200;
player.velocityX=0;
}

if (player.isTouching(barrelGr)){
health=health-25;
explotion.play();
barrelGr.destroyEach();
}
if (player.isTouching(boxGr)){
health=health-5;
 boxbreak.play();
boxGr.destroyEach();

}
if (player.isTouching(zombieGr)){
health=health-30;
zDed.play();
zombieGr.destroyEach();
}

if (player.isTouching(boxGr)){
health=health-15;
boxbreak.play();
boxGr.destroyEach();
}

if(player.isTouching(treeGr)){
health=health-20;
punchSound.play();
treeGr.destroyEach();
}

if(player.isTouching(acidGr)){
health=health-1
hitSound.play();
// acidGr.destroyEach();
}

if(player.isTouching(spikeGr)){
health=health-15;
hitSound.play();

spikeGr.destroyEach();
}


if(health<1){
lives=lives-1;
health=100;
barrelGr.destroyEach();
treeGr.destroyEach();
boxGr.destroyEach();
platformGr.destroyEach();
zombieGr.destroyEach();
acidGr.destroyEach();
spikeGr.destroyEach();
sbulGr.destroyEach();
healthtokenGr.destroyEach();
BulletGr.destroyEach();
co1.x=co1.x+1400;
co2.x=co2.x+1400;
co3.x=co3.x+1400;
co4.x=co4.x+1400;
co5.x=co5.x+1400;
player.y=-50;
bullet=0;
points=points-10;
kill.play();
}

// if(player.y>gr.y){
// lives=lives-1;
// points=points-10;
// player.y=200
// }



}


function Conditions(){

textSize(38);
 strokeWeight(4);
 stroke(0);
// noStroke();
textFont(font2);
fill("red")
text("Health: "+health,200,100);
text("Lives: "+lives,800,100);
fill("blue")
text("Points: "+points,200,150);

textSize(30);
textFont(font2);
strokeWeight(4);
 stroke(0);
// noStroke();
fill("green");
text(" Bullets: "+bullet,800,150);
}


function HealthToken(){

if (frameCount%550===0){

healthtoken=createSprite(1400,random(100,600),20,20);
healthtoken.shapeColor="red"
healthtoken.velocityX=-(9+5*points/50);
healthtokenGr.add(healthtoken);
healthtoken.addImage(heart);
healthtoken.scale=0.3;
healthtoken.lifetime=200;
}

if (player.isTouching(healthtokenGr)){
health=health+10;
healthtokenGr.destroyEach();
heal.play();
}

if(health>100){
health=100
}


}
