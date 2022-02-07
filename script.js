class Particule {
  // paramétrage de la particule
  // la position x/y de base de la particule
  // la couleur de la particule, la taille minimale et maximale
  // la distance minimale entre deux particules pour créer une ligne
  // la vitesse minimale et maximale de la particule
  constructor(color, rayonMin, rayonMax, distance, circleContainer) {
    
    //this.x = random(rayonMax / 2, width - rayonMax / 2);
    //this.y = random(rayonMax / 2, height - rayonMax / 2);
    this.x = circleContainer.x
    this.y = circleContainer.y
    this.position = new p5.Vector(this.x, this.y);
    this.r = random(rayonMin, rayonMax);
    this.xSpeed = random(0.8, -0.8);
    this.ySpeed = random(0.8, -0.8);
    this.color = color;
    this.distance = distance;
    this.circleContainer = circleContainer;
  }

  // création de la particule
  createParticule() {
    noStroke();
    strokeWeight(1);
    fill(this.color);
    circle(this.x, this.y, this.r);
  }

  // fonction de mouvement de la particule et de sa limite dans le canvas
  moveParticule(other) {
    this.position.set(this.x, this.y);
    let distanceVect = p5.Vector.sub(other.position, this.position);
    let distanceVectMag = distanceVect.mag();
    let minDistance = this.r + other.r;

    //console.log(distanceVectMag)
    
    if(distanceVectMag < minDistance) {

    } else {
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
        stroke(this.color);
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

class ContentCircle {
  constructor(red, green, blue, x, y) {
    this.position = new p5.Vector(x, y);
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.x = x;
    this.y = y;
    this.particules = [];
    this.r = 100 - 4;
  }

  createCircle() {
    noFill();
    stroke(this.red, this.green, this.blue);
    strokeWeight(4);
    circle(this.x, this.y, 200);
  }
}

// création du tableau pour afficher les particules
let particules = [];
// création du tableau de stockage pour les groupes de maladies
let allParticules = [];

// création du tableau de stockage pour les cercles
let circles = []


function setup() {
  let canvas = createCanvas(windowWidth, Math.round(windowHeight * 0.8));
  canvas.parent("canvas-container");

  let countPosition = 0;
  let rayon = height / 3;
  let centerX = width / 2;
  let centerY = height / 2;

  function positionCercles(startAngle, elementForm) {
    countPosition++;
    angleMode(DEGREES);

    const angle = 360 / 3;
    const count = startAngle + countPosition * angle;

    // calcul des points x et y
    let newX = centerX + rayon * cos(count);
    let newY = centerY + rayon * sin(count);

    elementForm.x = Math.round(newX)
    elementForm.y = Math.round(newY);
    elementForm.position.set(newX, newY)
  }


  data.forEach((element, index) => {
    if (element.type === "secondary") {

    let circleSecondary = new ContentCircle(element.color.r, element.color.g, element.color.b, width / 2, height / 2)
      positionCercles(-90, circleSecondary);

      circles.push(circleSecondary)
    }

    else {
        let circlePrimary = new ContentCircle(element.color.r, element.color.g, element.color.b, width / 2, height / 2)
        circles.push(circlePrimary)
    }
  });

  circles.forEach((el, index) => {
    for(let i = 0; i < 20; i++) {
        el.particules.push(new Particule(`rgb(${circles[index].red}, ${circles[index].green}, ${circles[index].blue})`, 5, 10, 50, circles[index]))
    }
    console.log(el)
})
  

  // Création des zones des différents objets secondaires
}
function draw() {
  // on setup le background du canvas
  background("rgba(250, 250, 250, 0)");

  // on clear pour pas que les particules laissent des "traces"
  clear();

  circles.forEach((el, index) => {
      el.createCircle()
      el.particules.forEach((particule, i) => {
        particule.createParticule();
        particule.moveParticule(el);
        particule.joinParticules(el.particules.slice(i));
      })
  })
  

  // on dessine les particules et on appelle leur fonctions de déplacement et de jointures
  particules.forEach((element) => {
    for (let i = 0; i < element.length; i++) {
      element[i].createParticule();
      element[i].moveParticule();
      element[i].joinParticules(element.slice(i));
    }
  });
}

// on resize le canvas sur le resize de la fenêtre (à corriger)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.8);
}
