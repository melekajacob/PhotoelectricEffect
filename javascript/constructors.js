function Electron(lightFrequency, workFunction, velocity) {
  this.y = random() * 200 + 40;
  this.x = 140;
  this.velocity = velocity;

  this.kineticEnergy = 6.63 * Math.pow(10, -34) * lightFrequency - workFunction;
  this.cutoffRequired = this.kineticEnergy / (1.6 * Math.pow(10, -19));

  this.show = function() {
    fill(66, 134, 244);
    ellipse(this.x, this.y, 10, 10);
  };

  this.update = function(potentialDifference) {
    if (potentialDifference > this.cutoffRequired && this.x > 450) {
      this.velocity -= potentialDifference / 10;
    }
    this.x += this.velocity;
  };

  this.turnAround = function() {
    this.x = this.x - 100;
  };
}

// For when potential difference will be visualized
// function PosCharge() {
//   this.y = random() * 200 + 40;
//   this.x = 130;

//   this.show = function() {
//     stroke(0);
//     strokeWeight(2);
//     line(this.x - 2, this.y, this.x + 2, this.y);
//     line(this.x, this.y - 2, this.x, this.y + 2);
//     noStroke();
//   };
// }

// function negCharge() {
//   this.y = random() * 200 + 40;
//   this.x = 510;
// }
