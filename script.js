var redTankObj;
var blueTankObj;
var RTankImgLoaded = false;
var blueBulletCounter = true;

//movement boolean expressions
var upArrowKeyDown = false;
var redTankCanMoveForward = true;
var downArrowKeyDown = false;
var redTankCanMoveBackward = true;
var rightArrowKeyDown = false;
var redTankCanMoveRight = true;
var leftArrowKeyDown = false;
var redTankCanMoveLeft = true;

var wKeyDown = false;
var blueTankCanMoveForward = true;
var sKeyDown = false;
var blueTankCanMoveBackward = true;
var dKeyDown = false;
var blueTankCanMoveRight = true;
var aKeyDown = false;
var blueTankCanMoveLeft = true;

//const FBanimationTimeout = setTimeout();unfinished

function startGame() {
  myGameArea.start();
  redTankObj = new Component(5, 5, "blue", 250, 450, "red");
  blueTankObj = new Component(5, 5, "red", 250, 50, "blue");
  document.getElementById("Start").style.display = "none"

}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.id = "canvasserie";
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    this.interval = setInterval(updateAnimations, frameRate)
    window.addEventListener('keydown', function(e) {
      e.preventDefault();
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function(e) {
      myGameArea.keys[e.keyCode] = (e.type == "keydown");
    })
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}

function updateGameArea() {
  //ctx.clearRect(0,0,redTankObj.width, redTankObj.height);
  myGameArea.clear();
  redTankObj.moveAngle = 0;
  redTankObj.speed = 0;
  blueTankObj.moveAngle = 0;
  blueTankObj.speed = 0;
  checkKeysForRedTank();
  checkKeysForBlueTank();
  checkKeysForBlueBullet();
  drawWalls();
  wallCollisionsRed();
  wallCollisionsBlue();

  redTankObj.newPos();
  redTankObj.tanksUpdate();
  blueTankObj.newPos();
  blueTankObj.tanksUpdate();
  //bullet.updateBluebullet();
  clearTimeout();
}








