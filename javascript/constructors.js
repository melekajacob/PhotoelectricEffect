function Electron(lightFrequency, workFunction, velocity) {
  this.y = random() * 200 + 40;
  this.x = 140;
  this.velocity = velocity;

  this.kineticEnergy = 6.63 * Math.pow(10, -34) * lightFrequency - workFunction;
  this.cutoffRequired = this.kineticEnergy / (1.6 * Math.pow(10, -19));

  this.show = function () {
    fill(66, 134, 244);
    ellipse(this.x, this.y, 10, 10);
  };

  this.update = function (potentialDifference) {
    if (potentialDifference > this.cutoffRequired && this.x > 450) {
      this.velocity -= potentialDifference / 10;
    }
    this.x += this.velocity;
  };

  this.turnAround = function () {
    this.x = this.x - 100;
  };
}
