// Things to Do
// Download libraries
// Style using bootstrap

var electrons = [];
var posCharges = [];
var negCharges = [];

var rateOfElectrons;
var startSimulation;
var lightFrequency = $("#lightFrequency").val();
var metals = document.querySelectorAll("option");
var selectedMetal = getMetal();
var kinEnergy = 0;

var potentialDifference = $("#potentialDifference").val();
var current = 0;

function setup() {
  electrons.push(new Electron());

  //Setting up background
  let canvas = createCanvas(640, 480);
}

function draw() {
  //Drawing Background
  background(35);

  //Checking if light source is on and the rate of electrons
  startSimulation = $("#myonoffswitch").prop("checked");
  rateOfElectrons = 60 - $("#lightIntensity").val();

  if (lightFrequency != $("#lightFrequency").val()) {
    lightFrequency = $("#lightFrequency").val();
  }

  if (potentialDifference != $("#potentialDifference").val()) {
    potentialDifference = $("#potentialDifference").val();
  }

  //Checking which metal is selected
  if (selectedMetal.name != $("select").val()) {
    selectedMetal = getMetal();
  }

  //Drawing the lab design and the light source
  drawApparatus();

  if (
    startSimulation &&
    getLightFrequency(lightFrequency) >= selectedMetal.thresholdFrequency
  ) {
    metals.forEach(function(metal) {
      if (selectedMetal.name != metal.value) {
        metal.setAttribute("disabled", "disabled");
      }
    });

    if (frameCount % rateOfElectrons == 0) {
      velocity = lightFrequency / 4;
      electrons.push(
        new Electron(
          getLightFrequency(lightFrequency),
          selectedMetal.workFunction,
          velocity
        )
      );
    }

    for (var i = electrons.length - 1; i >= 0; i--) {
      electrons[i].show();
      electrons[i].update(potentialDifference);
      kinEnergy =
        6.63 * Math.pow(10, -34) * getLightFrequency(lightFrequency) -
        selectedMetal.workFunction;

      if (electrons[i].x > 495 || electrons[i].x < 135) {
        if (electrons[i].x > 495) {
          current = $("#lightIntensity").val() / 10;
        }
        electrons.splice(i, 1);
      }

      if (potentialDifference >= electrons[i].cutoffRequired) {
        current = 0;
      }

      writeValues(
        $("#lightIntensity").val(),
        getLightFrequency(lightFrequency),
        selectedMetal,
        potentialDifference,
        current,
        kinEnergy
      );
    }
  } else {
    if (!startSimulation) {
      metals.forEach(function(metal) {
        metal.removeAttribute("disabled");
      });
    }
    electrons = [];
    writeValues(0, 0, selectedMetal, potentialDifference, 0, 0);
  }
}

function drawApparatus() {
  // Drawing light source
  if (startSimulation) {
    var lightIntensity = $("#lightIntensity").val() / 100;
    fill("rgba(255,255,153," + String(lightIntensity) + ")");
    quad(300, 0, 140, 40, 140, 240, 330, 0);
  }

  // Displaying Potential Difference

  // Drawing apparatus
  fill(255);
  rect(120, 40, 20, 200, 10);
  rect(500, 40, 20, 200, 10);
  stroke(255);
  strokeWeight(4);
  line(120, 140, 80, 140);
  line(520, 140, 560, 140);
  line(80, 140, 80, 440);
  line(560, 140, 560, 440);
  line(80, 440, 560, 440);
  noStroke();
}

function getMetal() {
  var metal = {
    name: String,
    workFunction: Number,
    thresholdFrequency: Number,
    color: String
  };

  metal.name = $("select").val();

  if (metal.name == "Nickel") {
    metal.workFunction = toJoules(5.01);
    metal.thresholdFrequency = metal.workFunction / (6.63 * Math.pow(10, -34));
  } else if (metal.name == "Zinc") {
    metal.workFunction = toJoules(4.3);
    metal.thresholdFrequency = metal.workFunction / (6.63 * Math.pow(10, -34));
  } else if (metal.name == "Magnesium") {
    metal.workFunction = toJoules(3.68);
    metal.thresholdFrequency = metal.workFunction / (6.63 * Math.pow(10, -34));
  } else if (metal.name == "Calcium") {
    metal.workFunction = toJoules(2.9);
    metal.thresholdFrequency = metal.workFunction / (6.63 * Math.pow(10, -34));
  } else {
    metal.workFunction = toJoules(2.1);
    metal.thresholdFrequency = metal.workFunction / (6.63 * Math.pow(10, -34));
  }

  return metal;
}

function getLightFrequency(photonEnergy) {
  return toJoules(photonEnergy) / (6.63 * Math.pow(10, -34));
}

function toJoules(eV) {
  return eV * (1.6 * Math.pow(10, -19));
}

function writeValues(
  lightIntensity,
  lightFrequency,
  selectedMetal,
  potentialDifference,
  current,
  kinEnergy
) {
  $("#intensityCell").text(lightIntensity);

  if (lightFrequency != 0) {
    $("#frequencyCell").text(lightFrequency.toExponential(3) + " Hz");
  } else {
    $("#frequencyCell").text("0");
  }

  $("#metalNameCell").text(selectedMetal.name);
  $("#workFunctionCell").text(
    selectedMetal.workFunction.toExponential(3) + " J"
  );
  $("#thresholdFreqCell").text(
    selectedMetal.thresholdFrequency.toExponential(3) + " Hz"
  );
  $("#potentialDiffCell").text(potentialDifference + " V");
  $("#currentCell").text(current + " A");

  if (kinEnergy != 0) {
    $("#kineticEnergyCell").text(kinEnergy.toExponential(3) + " J");
  } else {
    $("#kineticEnergyCell").text("0");
  }
}
