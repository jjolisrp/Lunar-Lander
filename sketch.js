//MIRAR DE USAR FRAMECOUNT COMO UN DELTATIME

let nave;
let naveImage;
let explosionGif;
let gravity;
let UpVelocity;
let rotateAngle;
let forceDirection;
let iRotate;
let lastNavePosition;
let isPlayerAlive;
let isGamePaused;

let mapPointsArray = [];

function preload()
{
  naveImage = loadImage("Nave.png");
  explosionGif = loadImage("explosion.gif")
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  angleMode(DEGREES);

  InitializeKeyValues();

  CreateMap();

  nave = new Nave(1, windowWidth / 2, windowHeight / 2, 50, 50);

  gravity = createVector(0.005, 0.02)

  iRotate = 0;

  isPlayerAlive = true;

  isGamePaused = false;

  lastNavePosition = createVector(0, 0);
}

function draw() 
{
  if(isPlayerAlive == true && !isGamePaused)
  {
    clear();

    background(0);

    DrawPlayer();

    print(mapPointsArray[1].MapPoint + "\n");

    DrawMap();

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
  else if(isPlayerAlive == false && !isGamePaused)
  {
    clear();

    background(0);

    DrawOnPlayerDeath();
  }

  if(keyIsDown(ESCAPE) === true)
  {
    if(isPlayerAlive)
    {
      isGamePaused = !isGamePaused;
    }
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

class MapPoint
{
  constructor(x, y)
  {
    this.position = createVector(x, y);
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

function DrawOnPlayerDeath()
{
  image(explosionGif, nave.position.x, nave.position.y - 35, 200, 200);
  isGamePaused = true;
}

function DrawMap()
{
  noFill();
  stroke(255);
  beginShape();

  for(let i = 0; i < mapPointsArray.length; i++)
  {
    let positionY = mapPointsArray[i].position.x;
    let positionX = mapPointsArray[i].position.y;

    curveVertex(positionY, positionX);
  }

  endShape();
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
  //DETECTA SI EL PLAYER SE SALE DE LOS LIMITES Y LO MATA
  if(nave.position.x <= 0 + 15)
  {
    nave.position.x = 0 + 15;
    isPlayerAlive = false;
  }

  if(nave.position.x >= windowWidth - 15)
  {
    nave.position.x = windowWidth - 15;
    isPlayerAlive = false;
  }

  if(nave.position.y >= windowHeight - 35)
  {
    nave.position.y = windowHeight - 35;
    isPlayerAlive = false;
  }

  if(nave.position.y <= 0 + 35)
  {
    nave.position.y = 35;
    isPlayerAlive = false;
  }
}

function CreateMap()
{
  // let limitsY = createVector(0, windowHeight);
  // let limitX = createVector(0, windowWidth);
  
  let pointsNumber = random(10, 15);
  let positionInWindow = 0;

  let positionX;
  let positionY;
  let point;

  for(let i = 0; i < pointsNumber; i++)
  {
    positionX = positionInWindow;
    positionInWindow += windowWidth / pointsNumber;
    positionY = random(windowHeight, windowHeight - 300);

    point = new MapPoint(positionX, positionY);

    mapPointsArray.push(point);
  }
}