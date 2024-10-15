//MIRAR DE USAR FRAMECOUNT COMO UN DELTATIME

let nave;
let gravity;
let UpVelocity;
let rotateAngle;

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  InitializeKeyValues();

  nave = new Nave(1, windowWidth / 2, windowHeight / 2, 100, 100);

  gravity = createVector(0.001, 0.02)

  naveImage = loadImage("Nave.png")
}

function draw() 
{
  DrawPlayer();

  UpdatePosition();

  //print(nave.position +  "\n");

  Fall();

  //DETECTAR PULSACION DE LAS TECLAS
  if(keyIsDown(UP_ARROW) === true)
  {
    nave.velocity.add(UpVelocity);
  }
  if(keyIsDown(LEFT_ARROW) === true)
  {
    rotate(rotateAngle);
  }
  if(keyIsDown(RIGHT_ARROW) === true)
  {
    
  }
  // if(keyIsDown(UP_ARROW) === true)
  // {
    
  // }
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

function DrawPlayer()
{
  clear();

  imageMode(CENTER);
  image(naveImage, nave.position.x, nave.position.y, nave.scale.h, nave.scale.w);
}

function Fall()
{
  nave.velocity.add(gravity);
}

function UpdatePosition()
{
  nave.position.add(nave.velocity)
}

function InitializeKeyValues()
{
  //INICIALIZAR LAS VARIABLES DE LAS KEYS/ARROWS
  UpVelocity = createVector(0, -0.03);
}