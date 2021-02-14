class Mario {
  constructor(x, y, width, height) {
    
    this.image=loadAnimation("mario1.png","mario2.png","mario3.png","mario4.png")
    this.body = Bodies.rectangle(x, y, width, height)
    this.width = width
    this.height = height
    World.add(world, this.body);
  }

  display() {
    push()
    var pos = this.body.position;
    //imageMode(CENTER)
    //image(this.image,pos.x, pos.y, this.width, this.height)
    pop()
  }
}