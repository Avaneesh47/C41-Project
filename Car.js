class Car{
    constructor(x,y){
        this.car = createSprite(x,y);
        this.image = loadImage("car1.png");
        this.car.scale = 0.2;
        this.car.addImage(this.image);
    }
    display(){
        drawSprites();
    }
}