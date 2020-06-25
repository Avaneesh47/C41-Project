class Enemy{
    constructor(x,y){
        this.enemy = createSprite(x,y);
        this.image = loadImage("car2.png");
        this.enemy.scale = 0.2;
        this.enemy.addImage(this.image);
    }
    display(){
        drawSprites();
    }
}