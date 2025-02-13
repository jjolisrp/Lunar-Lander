//MIRAR DE USAR FRAMECOUNT COMO UN DELTATIME
//GAME
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

//MAP
let mapPointsArray = [];
let interpolatedPoints = [];
let mapCollisionRadius;

//HUD
let distanceToFloor = 0;
let realDistanceToFloor = 10000000;
let naveAngleHud = 0;
let fuel = 300;
let restartButton;
let mainMenuButton;

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

  mapCollisionRadius = 20;

  isPlayerAlive = true;

  isGamePaused = false;

  lastNavePosition = createVector(0, 0);
}

function draw() 
{
  if(isPlayerAlive == true && !isGamePaused)
  {
    restartButton = null;

    clear();

    background(0);

    DrawPlayer();

    DrawMap();

    DrawHud();

    UpdatePosition();

    UpdateHud();

    Fall();

    CheckLimits();

    CheckCollision(nave.position)

    //Extra Conditions
    CheckExtraConditions();

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
  }
  else if(isPlayerAlive == false && !isGamePaused)
  {
    clear();

    background(0);

    DrawOnPlayerDeath();
  }
}

function keyPressed()
{
  if(keyCode == ESCAPE)
  {
    isGamePaused = !isGamePaused;

    DrawPauseMenu();
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
  curveVertex(0, 0);

  for(let i = 0; i < mapPointsArray.length; i++)
  {
    let positionY = mapPointsArray[i].position.x;
    let positionX = mapPointsArray[i].position.y;

    curveVertex(positionY, positionX);
  }

  curveVertex(mapPointsArray[mapPointsArray.length - 1].position.x, mapPointsArray[mapPointsArray.length - 1].position.y);

  endShape();
}

function DrawHud()
{
  textSize(40);

  //HEIGH POSITION
  push();
    fill(255);
    rect(10, 150, 50, distanceToFloor);
  pop();

  rect(10, 150, 50, 400);

  push();
    translate(70, windowHeight/3);
    rotate(90);
    text("Altitude", 0, 0);
  pop();

  //Angle
  text(round(naveAngleHud, 0) + "º", windowWidth / 2, 50);

  //Fuel
  push();
    fill(255, 0, 0);
    stroke(0);
    rect(windowWidth/1.4, 50, fuel, 50);
  pop();

  push();
    fill(255, 0, 0);
    stroke(255, 0, 0);
    translate(windowWidth/1.4, 50);
    text("Fuel", 150, -5);
  pop();
}

function DrawPauseMenu()
{
  translate((windowWidth / 2) - 250, (windowHeight / 2) - 250);

  fill(255);
  rect(0, 0, 500, 500);

  restartButton = createButton("Restart");
  restartButton.position(windowWidth / 2, (windowHeight / 2) - 100);
  restartButton.style("font-size", "24px");
  restartButton.mousePressed(gotolink);
}

function Fall()
{
  nave.velocity.add(gravity);
}

function UpdatePosition() 
{
  nave.position.add(nave.velocity)
}

function UpdateHud()
{
  //HEIGH POSITION
  distanceToFloor = ((realDistanceToFloor % 400) + 400) % 400;

  //NAVE ANGLE
  naveAngleHud = abs(atan2(UpVelocity.x, -UpVelocity.y));

  //FUEL
  fuel -= 0.5;
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
  let pointsNumber = random(10, 15);
  let positionInWindow = 0;

  let positionX;
  let positionY;
  let point;

  for(let i = 0; i < pointsNumber; i++)
  {
    positionX = positionInWindow;
    positionInWindow += windowWidth / pointsNumber;
    positionY = random(windowHeight - 50, windowHeight - 300);

    point = new MapPoint(positionX, positionY);

    mapPointsArray.push(point);
  }

  mapPointsArray.push(new MapPoint(windowWidth, random(windowHeight - 300, windowHeight - 50)));
}

function DistanceToSegment(p, A, B) //Devuelve la distancia mas corta del jugador al segmento 
{
  let AP = p5.Vector.sub(p, A); //Distancia del vector A a P(nave)
  let AB = p5.Vector.sub(B, A); //Distancia del vector A a B

  let magnitudeAB = AB.magSq(); //Calcular la magnitud del vector AB
  let ABdotAP = AP.dot(AB); //Hacer el producto escalar del vector AP a AB

  let t = constrain(ABdotAP / magnitudeAB, 0, 1); //Normalizar el vector resultantes, mantenerlo entre el 0 y el 1
  let closestPoint = p5.Vector.add(A, AB.mult(t)); //Calcula la posicion del vector mas cercano al Vector AB al punto P

  push();
  strokeWeight(10);
  point(closestPoint.x, closestPoint.y);
  pop();

  return p5.Vector.dist(p, closestPoint);
}

function CheckCollision(playerPosition)
{
  for(let i = 0; i < mapPointsArray.length - 1; i++)
  {
    let A = mapPointsArray[i].position;
    let B = mapPointsArray[i + 1].position;
    let distance = DistanceToSegment(playerPosition, A, B);
    
    if(distance < realDistanceToFloor)
    {
      realDistanceToFloor = distance;
    }

    if(distance <= mapCollisionRadius)
    {
      let segmentAngle = atan2(B.y - A.y, B.x - A.x);
      let naveAngle = atan2(-UpVelocity.y, UpVelocity.x);

      let angleDif = abs(degrees(segmentAngle - naveAngle)) % 360;
      if(angleDif > 180)
      {
        angleDif = 360 - angleDif;
      }

      print(naveAngleHud);

      print("Segment Angle " + segmentAngle);
      print("Player Angle " + naveAngle);
      print("Total " + angleDif);

      if(angleDif <= 80 && nave.velocity.mag() < 1)
      {
        isGamePaused = true;
      }
      else
      {
        isPlayerAlive = false;
      }
    }
  }
}

function CheckExtraConditions()
{
  if(fuel <= 0)
  {
    isPlayerAlive = false;
  }
}

function gotolink()
{
  window.open("http://127.0.0.1:3000//game.html", '_self');
}