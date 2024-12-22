var redTankFor = new Array(); //Sprites for red tank
redTankFor[0] = new Image();
redTankFor[0].src = "sprites/forwardRed/sprite_0.png";

redTankFor[1] = new Image();
redTankFor[1].src = "sprites/forwardRed/sprite_1.png";

redTankFor[2] = new Image();
redTankFor[2].src = "sprites/forwardRed/sprite_2.png";

redTankFor[3] = new Image();
redTankFor[3].src = "sprites/forwardRed/sprite_3.png";

redTankFor[4] = new Image();
redTankFor[4].src = "sprites/forwardRed/sprite_4.png";

redTankFor[5] = new Image();
redTankFor[5].src = "sprites/forwardRed/sprite_5.png";

var redProgress = 0;

var blueTankFor = new Array(); //Sprites for blue tank
blueTankFor[0] = new Image();
blueTankFor[0].src = "sprites/forwardBlue/sprite_0.png";

blueTankFor[1] = new Image();
blueTankFor[1].src = "sprites/forwardBlue/sprite_1.png";

blueTankFor[2] = new Image();
blueTankFor[2].src = "sprites/forwardBlue/sprite_2.png";

blueTankFor[3] = new Image();
blueTankFor[3].src = "sprites/forwardBlue/sprite_3.png";

blueTankFor[4] = new Image();
blueTankFor[4].src = "sprites/forwardBlue/sprite_4.png";

blueTankFor[5] = new Image();
blueTankFor[5].src = "sprites/forwardBlue/sprite_5.png";

var blueProgress = 0;

var projectileSprites = new Array(); //Sprites for red tank
projectileSprites[0] = new Image();
projectileSprites[0].src = "sprites/Projectiles/Projectiles03.png";

projectileSprites[1] = new Image();
projectileSprites[1].src = "sprites/Projectiles/Projectiles04.png";

projectileSprites[2] = new Image();
projectileSprites[2].src = "sprites/Projectiles/Projectiles05.png";

projectileSprites[3] = new Image();
projectileSprites[3].src = "sprites/Projectiles/Projectiles06.png";

projectileSprites[4] = new Image();
projectileSprites[4].src = "sprites/Projectiles/Projectiles07.png";

projectileSprites[5] = new Image();
projectileSprites[5].src = "sprites/Projectiles/Projectiles08.png";

projectileSprites[6] = new Image();
projectileSprites[6].src = "sprites/Projectiles/Projectiles09.png";

projectileSprites[7] = new Image();
projectileSprites[7].src = "sprites/Projectiles/Projectiles010.png";

var bulletProgress = 0;

//Arena walls
wall1 = new component(8, 120, "blue", 60, 50);
wall2 = new component(8, 120, "blue", 430, 50);
wall3 = new component(80, 8, "blue", 62, 162);
wall4 = new component(80, 8, "blue", 358, 162);
wall5 = new component(250, 8, "blue", 124, 80);
wall6 = new component(250, 8, "red", 124, 410);
wall7 = new component(8, 120, "red", 60, 320);
wall8 = new component(8, 120, "red", 430, 320);
wall9 = new component(80, 8, "red", 62, 320);
wall10 = new component(80, 8, "red", 358, 320);
wallMiddle = new component(100, 100, "black", 200, 200);
wallMiddleLeft = new component(8, 60, "black", 75, 215);
wallMiddleRight = new component(8, 60, "black", 417, 215);
borderNorth = new component(500, 4, "black", 0, 0);
borderSouth = new component(500, 4, "black", 0, 496);
borderNorth = new component(4, 500, "black", 0, 0);
borderNorth = new component(4, 500, "black", 496, 0);

function bullet(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speed = 5;
  this.angle = 0;
  this.x = x;
  this.y = y;
  var ctx = myGameArea.context;
  ctx.fillStyle = color;

  this.update = function() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };
  this.newPos = function() {
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  };
  console.log("banana")
}

function Component(width, height, color, x, y, type, team) {
  this.team = team;
  this.type = type;
  this.width = width;
  this.height = height;
  this.speed = 0;
  this.angle = 0;
  if (this == blueTankObj) {
    this.angle = 90;
  }
  this.moveAngle = 0;
  this.x = x;
  this.y = y;
  this.bullet = [];

  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);

  this.tanksUpdate = function() {
    if (redTankFor[redProgress].complete && this == redTankObj) {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(redTankFor[redProgress], -50, -50, 100, 100);
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
      ctx.restore();
      //drawWalls();
    }
    if (blueTankFor[blueProgress].complete && this == blueTankObj) {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(blueTankFor[blueProgress], -50, -50, 100, 100);
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
      ctx.restore();
      //drawWalls();
    }

    for (var i = 0; i < this.bullet.length; i++) {
      this.bullet[i].update();
    }
  }
  this.newPos = function() {
    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
    for (var i = 0; i < this.bullet.length; i++) {
      this.bullet[i].newPos();
    }
  }
  this.shootSomething = function() {
    if (blueBulletCounter) {
      var bullet = new bulletBlue(5, 5, 'black', this.x, this.y);
      blueBulletCounter = false
    }
  }
}

function obstacle(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;

  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);



}
function bulletBlue(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speed = 0;
  this.angle = blueTankObj.angle;
  this.x = x;
  this.y = y;
  console.log(this.width + this.height + this.color + this.x + this.y + this.angle)
  this.updateBluebullet = function() {
    ctx.drawImage(projectileSprites[bulletProgress], -50, -50, 100, 100);

    ctx.fillRect(blueTankObj.x, blueTankObj.y, 10, 10);
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  
  

}
this.newPos = function() {
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
}
}

