//Create variables here

var dog, dogImage, happyDog;
var database;
var foodS, foodStock;
var feedDog, addFoods;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  
  dogImage = loadImage('images/dog.png');
  happyDog = loadImage("images/happyDog.png");
}

function setup() {

  database = firebase.database();

	createCanvas(500, 500);
  
  dog = createSprite(250,250,10,20);
  dog.addImage("dog1",dogImage);

  food = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(350,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(450,95);
  addFood.mousePressed(addFoods);

}


function draw() {  

  background = color(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM", 350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  }
  else{
    text("Last Feed : " + lastFed + "AM", 350,30);
  }

  food.display();

  drawSprites();

  //add styles here

  textSize(20);
  text("Food Remaining", 220,200);
  fill("black");
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<= 0){
    x = 0;
  }

  else {
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    fedTime : hour()
  })
}


