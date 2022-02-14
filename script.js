class Particule {
  // paramétrage de la particule
  // la position x/y de base de la particule
  // la couleur de la particule, la taille minimale et maximale
  // la distance minimale entre deux particules pour créer une ligne
  // la vitesse minimale et maximale de la particule

  constructor(rayonMin, rayonMax, distance, circleContainer, red, green, blue) {
    //this.x = random(rayonMax / 2, width - rayonMax / 2);
    //this.y = random(rayonMax / 2, height - rayonMax / 2);

    let R = circleContainer.r;
    let u = random();
    let radius = R * Math.sqrt(u);
    let theta = random(0, R * PI);

    this.x = circleContainer.x + radius * cos(theta);
    this.y = circleContainer.y + radius * sin(theta);

    this.position = new p5.Vector(this.x, this.y);
    this.r = random(rayonMin, rayonMax);
    this.xSpeed = random(0.5, -0.5);
    this.ySpeed = random(0.5, -0.5);
    this.distance = distance;
    this.circleContainer = circleContainer;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  // création de la particule
  createParticule() {
    noStroke();
    strokeWeight(1);
    fill(`rgb(${this.red}, ${this.green}, ${this.blue})`);
    circle(this.x, this.y, this.r);
  }

  // fonction de mouvement de la particule et de sa limite dans le canvas
  moveParticule(other) {
    this.position.set(this.x, this.y);
    let distanceVect = p5.Vector.sub(other.position, this.position);
    let distanceVectMag = distanceVect.mag();
    let minDistance = this.r + other.r;

    //console.log(distanceVectMag)

    if (distanceVectMag > minDistance) {
      this.xSpeed *= -1;
      this.ySpeed *= -1;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }

    if (this.x < this.r / 2 || this.x > width - this.r / 2) this.xSpeed *= -1;
    if (this.y < this.r / 2 || this.y > height - this.r / 2) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // fonction pour créer les lignes entre les particules
  // et parametrage de la distance minimale entre deux particules
  joinParticules(particules) {
    particules.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < this.distance) {
        stroke(`rgb(${this.red}, ${this.green}, ${this.blue})`);
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

class ParticuleToCenter {
  // paramétrage de la particule
  // la position x/y de base de la particule
  // la couleur de la particule, la taille minimale et maximale
  // la distance minimale entre deux particules pour créer une ligne
  // la vitesse minimale et maximale de la particule

  constructor(rayonMin, rayonMax, distance, circleContainer, red, green, blue) {
    //this.x = random(rayonMax / 2, width - rayonMax / 2);
    //this.y = random(rayonMax / 2, height - rayonMax / 2);
    this.circleContainer = circleContainer;

    this.R = circleContainer.r;
    this.u = random();
    this.radius = this.R * Math.sqrt(this.u);
    this.theta = random(0, this.R * PI);

    this.Rc = circleContainer.r;
    this.uc = random();
    this.radiusc = this.Rc * Math.sqrt(this.uc);
    this.thetac = random(0, this.Rc * PI);
    this.xCenter = width / 2 + this.radiusc * cos(this.thetac);
    this.yCenter = height / 2 + this.radiusc * sin(this.thetac);

    this.x = circleContainer.x + this.radius * cos(this.theta);
    this.y = circleContainer.y + this.radius * sin(this.theta);

    let middleX = width / 2;
    let middleY = height / 2;
    let distanceMiddleX;
    let distanceMiddleY;

    this.timing = random(4, 8) * 1000;

    this.startTime = millis();
    this.endTime = this.startTime + this.timing; // 3 seconds

    this.firstTime = true;

    this.initialX = Math.round(
      circleContainer.x + this.radius * cos(this.theta)
    );
    this.initialY = Math.round(
      circleContainer.y + this.radius * sin(this.theta)
    );

    this.P0 = createVector(this.initialX, this.initialY);
    this.P1 = createVector(this.xCenter, this.yCenter);

    // this.x = circleContainer.x;
    // this.y = circleContainer.y;
    this.position = new p5.Vector(this.x, this.y);
    this.r = random(rayonMin, rayonMax);
    this.xSpeed = random(0.1, 0.5);
    this.ySpeed = random(0.1, 0.5);

    this.way = true; 

    this.red = red;
    this.green = green;
    this.blue = blue;

    this.initRed = red;
    this.initGreen = green;
    this.initBlue = blue;

    this.redScale = 0;
    this.greenScale = 0;
    this.blueScale = 0;

    this.distance = distance;
    this.circleContainer = circleContainer;
  }

  // création de la particule
  createParticule() {
    noStroke();
    strokeWeight(1);
    fill(`rgb(${this.red}, ${this.green}, ${this.blue})`);
    circle(this.x, this.y, this.r);
  }

  // fonction de mouvement de la particule et de sa limite dans le canvas
  moveParticule(other) {
    let currentTIme = millis();
    let scale = min(
      1,
      (currentTIme - this.startTime) / (this.endTime - this.startTime)
    );

    let redDiff = Math.abs(this.initRed - 140);
    let greenDiff = Math.abs(this.initGreen - 198);
    let blueDiff = Math.abs(this.initBlue - 63);

    let V_dist = p5.Vector.sub(this.P1, this.P0).mult(scale);
    let PX = p5.Vector.add(this.P0, V_dist);

    this.x = PX.x;
    this.y = PX.y;

    let currentX;
    let currentY;

        if(this.way == true) {
            if (this.redScale < redDiff) {
                this.redScale++;
                if (this.initRed < 140) {
                  this.red += 1;
                } else {
                  this.red -= 1;
                }
              } 
              if (this.greenScale < greenDiff) {
                this.greenScale++;
                if (this.initGreen < 198) {
                  this.green += 1;
                } else {
                  this.green -= 1;
                }
              }
              if (this.blueScale < blueDiff) {
                this.blueScale++;
                if (this.initBlue < 63) {
                  this.blue += 1;
                } else {
                  this.blue -= 1;
                }
              }
        } else if(this.way == false) {
            if (this.redScale < redDiff) {
                this.redScale++;
                if (this.initRed < 140) {
                  this.red -= 1;
                } else {
                  this.red += 1;
                }
              } 
              if (this.greenScale < greenDiff) {
                this.greenScale++;
                if (this.initGreen < 198) {
                  this.green -= 1;
                } else {
                  this.green += 1;
                }
              }
              if (this.blueScale < blueDiff) {
                this.blueScale++;
                if (this.initBlue < 63) {
                  this.blue -= 1;
                } else {
                  this.blue += 1;
                }
              }
        }

    if (
      this.x == this.xCenter &&
      this.y == this.yCenter &&
      this.firstTime == true
    ) {
        this.redScale = 0
        this.greenScale = 0
        this.blueScale = 0
        this.way = false 
      this.R = this.circleContainer.r;
      this.u = random();
      this.radius = this.R * Math.sqrt(this.u);
      this.theta = random(0, this.R * PI);

      this.Rc = this.circleContainer.r;
      this.uc = random();
      this.radiusc = this.Rc * Math.sqrt(this.uc);
      this.thetac = random(0, this.Rc * PI);

      this.initialX = Math.round(
        this.circleContainer.x + this.radius * cos(this.theta)
      );
      this.initialY = Math.round(
        this.circleContainer.y + this.radius * sin(this.theta)
      );

      this.P0 = createVector(this.xCenter, this.yCenter);
      this.P1 = createVector(this.initialX, this.initialY);
      this.startTime = millis();
      this.endTime = this.startTime + this.timing;
      this.firstTime = false;
    }

    if (
      this.x == this.initialX &&
      this.y == this.initialY &&
      this.firstTime == false
    ) {
        this.redScale = 0
        this.greenScale = 0
        this.blueScale = 0
        this.way = true 

      this.R = this.circleContainer.r;
      this.u = random();
      this.radius = this.R * Math.sqrt(this.u);
      this.theta = random(0, this.R * PI);

      this.Rc = this.circleContainer.r;
      this.uc = random();
      this.radiusc = this.Rc * Math.sqrt(this.uc);
      this.thetac = random(0, this.Rc * PI);

      this.xCenter = width / 2 + this.radiusc * cos(this.thetac);
      this.yCenter = height / 2 + this.radiusc * sin(this.thetac);

      this.P0 = createVector(this.initialX, this.initialY);
      this.P1 = createVector(this.xCenter, this.yCenter);
      this.startTime = millis();
      this.endTime = this.startTime + this.timing;
      this.firstTime = true;
    }
  }

  // fonction pour créer les lignes entre les particules
  // et parametrage de la distance minimale entre deux particules
  joinParticules(particules) {
    particules.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < this.distance) {
        stroke(`rgb(${this.red}, ${this.green}, ${this.blue})`);
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

class ContentCircle {
  constructor(red, green, blue, x, y, type, image, points) {
    this.position = new p5.Vector(x, y);
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.x = x;
    this.y = y;
    this.particules = [];
    this.r = 100;
    this.type = type;
    this.image = image;
    this.points = points;
  }

  createCircle() {
    noFill();
    stroke(this.red, this.green, this.blue);
    strokeWeight(0);
    circle(this.x, this.y, this.r * 2);
  }
}

// création du tableau pour afficher les particules
let particules = [];
// création du tableau de stockage pour les groupes de maladies
let allParticules = [];

// création du tableau de stockage pour les cercles
let circles = [];

function setup() {
  let canvas = createCanvas(windowWidth, Math.round(windowHeight * 0.8));
  canvas.parent("canvas-container");

  let countPosition = 0;
  let rayon = height / 3;
  let centerX = width / 2;
  let centerY = height / 2;

  let countPositionSubtitles = 0;

  function positionCercles(startAngle) {
    countPosition++;
    angleMode(DEGREES);

    const angle = 360 / 3;
    const count = startAngle + countPosition * angle;

    // calcul des points x et y
    let newX = centerX + rayon * cos(count);
    let newY = centerY + rayon * sin(count);

    let valuePosition = [Math.round(newX), Math.round(newY)];
    return valuePosition;
  }

  function positionSubtitles(startAngle, circleX, circleY, rayonCircle, total) {
    countPositionSubtitles++;
    angleMode(DEGREES);
    console.log(total)

    const angle = 360 / total;
    const count = startAngle + countPositionSubtitles * angle;

    // calcul des points x et y
    let newX = circleX + rayonCircle * cos(count);
    let newY = circleY + rayonCircle * sin(count);

    let valuePosition = [Math.round(newX), Math.round(newY)];
    return valuePosition;
  }

  data.forEach((element, index) => {
    if (element.type === "secondary") {
      let positionCircle = positionCercles(-90);
      let circleSecondary = new ContentCircle(
        element.color.r,
        element.color.g,
        element.color.b,
        positionCircle[0],
        positionCircle[1],
        "secondary",
        element.image,
        element.subtitles
      );
      let image = createImg(`./img/${element.image}`)
      image.position(positionCircle[0] - 350/2, positionCircle[1] - 350/2)
      image.size(350, 350)

      for (let subtitle of element.subtitles) {
        let imageSubtitle = createImg('./img/plus.svg')
        let positionSub = positionSubtitles(90, positionCircle[0], positionCircle[1], 110, element.subtitles.length)
        imageSubtitle.position(positionSub[0] - 15/2, positionSub[1] - 15/2)
        imageSubtitle.size(15, 15)
      }

      countPositionSubtitles = 0

      circles.push(circleSecondary);
    } else {
      let circlePrimary = new ContentCircle(
        element.color.r,
        element.color.g,
        element.color.b,
        width / 2,
        height / 2,
        "primary",
        element.image,
        element.subtitles
      );
      circles.push(circlePrimary);
      let image = createImg(`./img/${element.image}`)
      image.position(width / 2 - 350/2, height / 2 - 350/2)
      image.size(350, 350)


      for (let subtitle of element.subtitles) {
        let imageSubtitle = createImg('./img/plus.svg')
        let positionSub = positionSubtitles(90, width / 2, height / 2, 110, element.subtitles.length)
        imageSubtitle.position(positionSub[0] - 15/2, positionSub[1] - 15/2)
        imageSubtitle.size(15, 15)
      }

      countPositionSubtitles = 0


    }
  });

  circles.forEach((el, index) => {
    if (el.type == "secondary") {
      for (let i = 0; i < 40; i++) {
        el.particules.push(
          new ParticuleToCenter(
            4,
            7,
            25,
            circles[index],
            circles[index].red,
            circles[index].green,
            circles[index].blue
          )
        );
      }

      for (let i = 0; i < 60; i++) {
        el.particules.push(
          new Particule(
            4,
            7,
            25,
            circles[index],
            circles[index].red,
            circles[index].green,
            circles[index].blue
          )
        );
      }
    } else {
      for (let i = 0; i < 40; i++) {
        el.particules.push(
          new Particule(
            4,
            7,
            25,
            circles[index],
            circles[index].red,
            circles[index].green,
            circles[index].blue
          )
        );
      }
    }
  });

  // Création des zones des différents objets secondaires
}
function draw() {
  // on setup le background du canvas
  background("rgba(250, 250, 250, 0)");

  // on clear pour pas que les particules laissent des "traces"
  clear();

  let allParticulesJoin = [];
  circles.forEach((el, index) => {
    el.particules.forEach((part) => {
      allParticulesJoin.push(part);
    });
  });

  circles.forEach((el, index) => {
    el.createCircle();
    el.particules.forEach((particule, i) => {
      particule.createParticule();
      particule.moveParticule(el);
      particule.joinParticules(allParticulesJoin.slice(i));
    });
  });
}

// on resize le canvas sur le resize de la fenêtre (à corriger)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.8);
}
