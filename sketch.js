//MIRAR DE USAR FRAMECOUNT COMO UN DELTATIME

let nave;
let naveImage;
let gravity;
let UpVelocity;
let rotateAngle;
let forceDirection;

function preload()
{
  naveImage = loadImage("Nave.png");
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  InitializeKeyValues();

  nave = new Nave(1, windowWidth / 2, windowHeight / 2, 100, 100);

  gravity = createVector(0.001, 0.02)
}

function draw() 
{
  clear();

  background(0);

  DrawPlayer();

  UpdatePosition();

  //print(nave.position +  "\n");

  Fall();

  //DETECTAR PULSACION DE LAS TECLAS
  if(keyIsDown(UP_ARROW) === true)
  {
    //He de actualizar la velocidad en funxcion de la direccionde la fuerza y la fuerza
    nave.velocity.add(UpVelocity);
  }
  if(keyIsDown(LEFT_ARROW) === true)
  {
    nave.position.rotateAngle(50);
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
  imageMode(CENTER);
  image(naveImage, nave.position.x, nave.position.y, nave.scale.x, nave.scale.y);
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

void CheckLimits()
{

}