var dog,sadDog,happyDog;
var foodObject;
var foodS , foodStock , addFood;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  foodObject = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value" , readStock);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800 , 95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background("blue");
  foodObject.display();
  drawSprites();
}

function readStock(data){
  foodS  = data.val();
  foodObject.updateFoodStock(foodS);
   
}


function feedDog(){
  dog.addImage(happyDog);

  if(foodObject.getFoodStock <= 0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);

  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}