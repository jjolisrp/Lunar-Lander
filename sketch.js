function setup() 
{
  createCanvas(windowWidth, windowHeight);
}



function draw() 
{

}

class Mover 
{
    constructor(m, x, y, c) 
    {
      this.mass = m;
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.color = c;
    }
}

applyForce(force) 
{
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
}