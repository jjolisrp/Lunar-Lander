//MIRAR DE USAR FRAMECOUNT COMO UN DELTATIME

let nave;
let naveImage;
let explosionGif;
let gravity;
let UpVelocity;
let rotateAngle;
let forceDirection;
let iRotate;

function preload()
{
  naveImage = loadImage("Nave.png");
  explosionGif = createImage("explosion.gif")
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  angleMode(DEGREES);

  InitializeKeyValues();

  nave = new Nave(1, windowWidth / 2, windowHeight / 2, 100, 100);

  gravity = createVector(0.005, 0.02)

  iRotate = 0;
}

function draw() 
{
  clear();

  background(0);

  DrawPlayer();

  UpdatePosition();

  //print(nave.position +  "\n");

  Fall();

  CheckLimits();

  //DETECTAR PULSACION DE LAS TECLAS
  if(keyIsDown(UP_ARROW) === true)
  {
    //He de actualizar la velocidad en funcion de la direccion de la fuerza
    nave.velocity.add(UpVelocity);
  }
  if(keyIsDown(LEFT_ARROW) === true)
  {
    UpVelocity.rotate(-1);
    iRotate -= 1;
  }
  if(keyIsDown(RIGHT_ARROW) === true)
  {
    UpVelocity.rotate(1);
    iRotate += 1;
  }
  if(keyIsDown(DOWN_ARROW) === true)
  {
    
  }
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
  push()
  translate(nave.position.x, nave.position.y);
  rotate(iRotate)
  image(naveImage, 0, 0, nave.scale.x, nave.scale.y);
  pop();
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

function CheckLimits()
{
  if(nave.position.x <= 0 + 35)
  {
    nave.position.x = 0 + 35;
  }

  if(nave.position.x >= windowWidth - 35)
  {
    nave.position.x = windowWidth - 35;
  }

  if(nave.position.y >= windowHeight - 65)
  {
    nave.position.y = windowHeight - 65;
  }

  if(nave.position.y <= 0 + 50)
  {
    nave.position.y = 50;
  }
}