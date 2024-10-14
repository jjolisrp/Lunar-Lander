let nave;
let navePosition;
let naveScale;
let naveVelocity;
let naveAcceleration;
let naveMass;
let gravity;

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  nave = new Nave(1, windowWidth / 2, windowHeight / 2, 100, 100);

  gravity = createVector(0, -0.1)

  InitializeNave();

  nave = loadImage("Nave.png")
}

function draw() 
{
  DrawPlayer();

  UpdatePosition();

  Fall();
}

class Nave 
{
    constructor(m, x, y, h, w) 
    {
      this.mass = m;
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.scale = createVector(h, w);
    }
}

function InitializeNave()
{
  navePosition = nave.position;
  naveScale = nave.scale;
  naveVelocity = nave.velocity;
  naveMass = nave.mass;
}

function DrawPlayer()
{
  imageMode(CENTER);
  image(nave, navePosition.x, navePosition.y, naveScale.h, naveScale.w);
}

function keyPressed()
{
  if(key === "w")
  {
    naveVelocity. y += 20;
  }
}

function Fall()
{
  naveVelocity += gravity;
}

function UpdatePosition()
{
  navePosition += naveVelocity
}