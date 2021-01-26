//Create variables here
var dog , sadDog,happyDog,garden,washroom,database;
var foodS , foodStock;
var fedTime, lastFed, curentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
  garden = loadImage("Images/Garden.png");
  washroom = loadImage("Images/Washroom.png");
  bedrrom = loadImage("Images/BedRoom.png");
}

function setup(){
  database = firebase.database();
  createCanvas(400,500);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock = on("value",foodStock);

  fedTime = database.ref('FoodTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  //read game state from database
  readState = database.ref('gameState');
  readState.on("value",function(data){
  gameState = data.val();
 });

dog = createSprite(200,400,150,150);
dog.addImage(sadDog);
dog.sclae = 0.15;

feed = createSprite(200 , 400 , 150 , 150);
feed = createSprite(700 , 95);
feed = mousePressed(feeding);
 
addFood = createButton("Add Food");
addFood.position(800 , 95);
addImage.mousePressed(addFood);
}

function draw(){
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodOnj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2 )&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }
}

if(gamaeState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}


  drawSprites();

 


//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodOnj.updateFoodStock(FoodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);



  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameStae:"Hungry"
  })
}

//function to add food in stack
function addFoods(){
FoodS++;
database.ref('/').update({
  Food:foodS
})
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}