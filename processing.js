var programCode = function (processingInstance) {
  with (processingInstance) {
    size(400, 395);
    frameRate(30);
    background(255, 255, 255);
    // Code starts here

    class Particle {
      constructor(position) {
        this.acceleration = new PVector(0, -0.05);
        this.velocity = new PVector(random(-1, 1), random(-1, 0));
        this.position = position.get();
        this.timeToLive = 200;
      }

      run() {
        this.update();
        this.display();
      }

      update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.timeToLive -= 2;
      }

      display() {
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        fill(255, 255, 255, 50);
        let radius = (height - this.position.y) / 10;
        ellipse(this.position.x, this.position.y, radius, radius);
      }

      isDead() {
        return this.timeToLive < 0;
      }
    }

    class ParticleSystem {
      constructor(position) {
        this.origin = position.get();
        this.particles = [];
      }

      addParticle() {
        this.particles.push(new Particle(this.origin));
      }

      run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          let p = this.particles[i];
          p.run();
          if (p.isDead()) {
            this.particles.splice(i, 1);
          }
        }
      }
    }

    class Fish {
      constructor(position) {
        this.position = position.get();
        this.width = 100;
        this.height = 60;
      }

      swim() {
        this.position.x += 1;
        if (this.position.x > 450) {
          this.position.x = -60;
        }
      }

      display() {
        noStroke();
        fill(255, 191, 0);
        ellipse(this.position.x, this.position.y, this.width, this.height);
        triangle(
          this.position.x - this.width / 2 + 10,
          this.position.y,
          this.position.x - this.width * 0.75,
          this.position.y + this.height / 3,
          this.position.x - this.width * 0.75,
          this.position.y - this.height / 3,
        );
        fill(255, 191, 0);
        triangle(
          this.position.x + this.width / 2 + 10,
          this.position.y - this.height / 12,
          this.position.x + this.width / 2 - 2,
          this.position.y + this.height / 8,
          this.position.x + this.width / 2 - 2,
          this.position.y - this.height / 8,
        );
        triangle(
          this.position.x + this.width / 2 + 10,
          this.position.y - this.height / 12 + 18,
          this.position.x + this.width / 2 - 10,
          this.position.y + this.height / 8 + 10,
          this.position.x + this.width / 2 - 12,
          this.position.y - this.height / 8 + 10,
        );
        fill(255, 255, 255);
        ellipse(
          this.position.x + this.width / 2 - 10,
          this.position.y - 11,
          15,
          20,
        );
        fill(0, 0, 0);
        ellipse(
          this.position.x + this.width / 2 - 7,
          this.position.y - 10,
          6,
          6,
        );
      }

      getMouthPosition() {
        return new PVector(
          this.position.x + this.width / 2 + 10,
          this.position.y,
        );
      }
    }
    let fish = new Fish(new PVector(width / 2, height / 2));
    let bubbles = new ParticleSystem(fish.getMouthPosition());

    draw = () => {
      background(17, 78, 117);
      if (frameCount % 8 === 1) {
        bubbles.addParticle();
      }
      bubbles.origin.set(fish.getMouthPosition());
      bubbles.run();
      fish.swim();
      fish.display();
    };

    // Code ends here
  }
};

var canvas = document.getElementById("mycanvas");

var processingInstance = new Processing(canvas, programCode);
