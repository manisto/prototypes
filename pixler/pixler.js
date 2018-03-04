let currentColor = null;

let data = {
  colors: [
    "#ff0000",
    "#ff8000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#000000",
    "#808080",
    "#c0c0c0",
    "#ffffff"
  ],
  size: 32,
  pixels: []
};

class Pixler {}

function handlePaint(event, row, column) {
  event.preventDefault();

  if (!event.buttons & 1) {
    return;
  }

  event.target.className = currentColor;
  data.pixels[row][column] = currentColor;
}

function selectColor(event) {
  if (!event.button === 0) {
    return;
  }

  let colorCells = document.querySelectorAll("table.colors td");
  let cell = event.target;

  colorCells.forEach(element => element.classList.remove("active"));
  currentColor = cell.className || null;
  cell.classList.add("active");
}

function generateCanvas() {
  let imageBody = document.querySelector("table.image tbody");
  removeAllChildren(imageBody);

  for (let rowCount = 0; rowCount < data.size; rowCount++) {
    let row = document.createElement("tr");
    imageBody.appendChild(row);

    let rowArray = [];
    data.pixels.push(rowArray);

    for (let cellCount = 0; cellCount < data.size; cellCount++) {
      let pixelClicked = function(event) {
        handlePaint(event, rowCount, cellCount);
      };
      rowArray[cellCount] = null;
      let cell = document.createElement("td");
      cell.addEventListener("mousemove", pixelClicked);
      cell.addEventListener("mousedown", pixelClicked);
      row.appendChild(cell);
    }
  }
}

function removeAllChildren(element) {
  element.innerHTML = "";
}

function generateStylesheet() {
  let styles = data.colors.map(
    (color, index) =>
      `.c${index} { background-image: none; background-color: ${color}; }`
  );
  styles.unshift(
    `table td { background-size: cover; background-image: url('${generateEmptyBackground()}'); }`
  );
  document.getElementById("colorStyles").innerText = styles.join("\n");
}

function createColor(color) {
  let cell = document.createElement("td");

  if (color === currentColor) {
    cell.classList.add("active");
  }

  if (color) {
    cell.classList.add(color);
  }

  return cell;
}

function generateColors() {
  let colorCells = [];

  colorCells.push(createColor(null));

  data.colors.forEach((color, index) => {
    colorCells.push(createColor(`c${index}`));
  });

  let colorRow = document.getElementById("colorRow");
  removeAllChildren(colorRow);

  colorCells.forEach(colorCell => {
    colorCell.addEventListener("click", selectColor);
    colorRow.appendChild(colorCell);
  });
}

function generateEmptyBackground() {
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = 150;
  let context = canvas.getContext("2d");
  context.fillStyle = "rgb(211, 211, 211)";
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(100, 0);
  context.lineTo(0, 100);
  context.closePath();
  context.fill();
  return canvas.toDataURL();
}

async function save() {
  let filename = await doPrompt("Please enter a file name");
  let dataAsString = JSON.stringify(data, null, 2);
  let blob = new Blob([dataAsString], { type: "application/json" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function load() {
  document.getElementById("file").click();
}

function fileSelected(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = result => {
    data = JSON.parse(result.target.result);
    let imageBody = document.querySelector("table.image tbody");
    for (let currentRow = 0; currentRow < data.size; currentRow++) {
      for (let currentCell = 0; currentCell < data.size; currentCell++) {
        imageBody.children[currentRow].children[currentCell].className =
          data.pixels[currentRow][currentCell];
      }
    }
  };
  reader.readAsText(file);
}

function doConfirm(message) {
  return new Promise((resolve, reject) => {
    if (window.confirm(message)) {
      resolve();
    } else {
      reject("User declined");
    }
  });
}

function doPrompt(message) {
  return new Promise((resolve, reject) => {
    let result = window.prompt(message);

    if (result) {
      resolve(result);
    } else {
      reject("No input from user");
    }
  });
}
generateCanvas();
generateStylesheet();
generateColors();
generateEmptyBackground();
