function setup() 
{
  createCanvas(windowWidth, windowHeight);

  background(200);

  InitializeNave();
}

function draw() 
{
  
}

class Nave 
{
    constructor(m, x, y, img) 
    {
      this.mass = m;
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      // Image(img, this.position.x, this.position.y, 50, 50);
    }
}

function InitializeNave()
{
  let mass = 0.5;
  let posX = windowWidth / 4;
  let posY = windowHeight / 4;

  // img = loadImage("recursos\imagenes\Fondo galaxia.jpg");

  // nave = new Nave(mass, posX, posY, img);
}

// applyForce(force) 
// {
//     let f = p5.Vector.div(force, this.mass);
//     this.acceleration.add(f);
// }