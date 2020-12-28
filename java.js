const canvas = document.getElementById("myhouse");
const ctx = canvas.getContext("2d");
var mousepressed = false;
var x1, x2, y1, y2;
var color = "black";
var mouseMoved = false;
var fillColor = "white";
var thicknessMode = true;
var xdiff, ydiff;
var prevx, prevy;
var dlinex1, dlinex2, dliney1, dliney2;

var hlinex, hliney, hlinex2, hliney2;
var disabled = true;
var brushSize = document.getElementById("range").value;
var lineWidth = document.getElementById("range2").value;
var mode = "default";

var createdDrawingscounter = 0;
var createdDrawings = [];

var ctrlPressed = false;
document.getElementById("p6").textContent = brushSize;
document.getElementById("p9").style.display = "none";
document.getElementById("p12").style.display = "none";
document.getElementById("range2").style.display = "none";
var elements = document.getElementsByClassName("buttons");
document.getElementById("h2").style.color = "black";
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function (event) {
    document.getElementById("h3").innerHTML = event.target.id;
    document.getElementById("h2").style.color = event.target.id;
    document.getElementById("h3").style.color = event.target.id;
    document.getElementById("h4").style.color = event.target.id;

    document.getElementById("p6").style.color = event.target.id;
    document.getElementById("p1").style.color = event.target.id;
    document.getElementById("p9").style.color = event.target.id;
    document.getElementById("p12").style.color = event.target.id;
    color = event.target.id;
  });
}

document
  .getElementById("myhouse")
  .addEventListener("mousedown", function (event) {
    if (event.button === 0) {
      disabled = false;
      mousepressed = true;
      x1 = event.layerX;
      y1 = event.layerY;
      prevx = x1;
      prevy = y1;
      ctx.beginPath();
      ctx.strokeStyle = color;
      if (mode === "default") {
        dlinex1 = x1;
        dliney1 = y1;
        ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
        createdDrawings[createdDrawingscounter] = {
          x: x1,
          y: y1,
          radius: 1,
          startAngle: 0,
          endAngle: 360,
          Color: color,
          redraw: true,
          mode: "default",
        };
        createdDrawingscounter++;
      } else if (mode === "rectangle") {
        ctx.lineWidth = lineWidth;

        ctx.rect(x1, y1, 3, 3);

        ctx.fillStyle = fillColor;
        ctx.fill();
      } else if (mode === "circle") {
        ctx.lineWidth = lineWidth;
        ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
      } else if (mode === "line") {
        hlinex = x1;
        hliney = y1;
      }
      ctx.closePath();
      ctx.stroke();

      // console.log(x1, y1, x2, y2);
    }
  });

document
  .getElementById("myhouse")
  .addEventListener("mousemove", function (event) {
    if (event.button === 0) {
      if (mousepressed === true) {
        //x2 = event.screenX - 355;
        //y2 = event.screenY - 210;
        redraw();
        x2 = event.layerX;
        y2 = event.layerY;
        if (mode === "default") {
          ctx.beginPath();

          ctx.strokeStyle = color;
          ctx.lineTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.lineWidth = brushSize;
          ctx.stroke();
          createdDrawings[createdDrawingscounter] = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            Color: color,
            lineWidth: brushSize,
            redraw: true,
            mode: "default",
          };
          createdDrawingscounter++;
          x1 = x2;
          y1 = y2;
        } else if (mode === "line") {
          ctx.beginPath();

          ctx.strokeStyle = color;
          ctx.lineTo(hlinex, hliney);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.lineWidth = brushSize;
          ctx.stroke();
          hlinex2 = x2;
          hliney2 = y2;
          mouseMoved = true;
        }
        xdiff = -(prevx - x2);
        ydiff = -(prevy - y2);
        if (mode === "rectangle") {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.rect(prevx, prevy, xdiff, ydiff);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        } else if (mode === "circle") {
          if (xdiff < 0) {
            xdiff = -xdiff;
          }
          ctx.beginPath();
          ctx.strokeStyle = color;

          ctx.lineWidth = lineWidth;
          ctx.arc(prevx, prevy, xdiff, 0, 2 * Math.PI);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  });

function redraw() {
  //var reversedItems = createdDrawings.map((item) => item).reverse();
  //console.log(reversedItems);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  disabled = false;
  createdDrawings.map((element) => {
    if (element.redraw === true) {
      if (element.mode === "default") {
        ctx.beginPath();

        ctx.strokeStyle = element.Color;
        ctx.lineTo(element.x1, element.y1);
        ctx.lineTo(element.x2, element.y2);
        ctx.closePath();
        ctx.lineWidth = element.lineWidth;
        ctx.stroke();
      } else if (element.mode === "circle") {
        ctx.beginPath();
        ctx.globalCompositeOperation = "multiply";
        ctx.strokeStyle = element.Color;

        ctx.lineWidth = element.lineWidth;
        ctx.arc(
          element.x,
          element.y,
          element.radius,
          element.startAngle,
          element.endAngle
        );

        ctx.fillStyle = element.fillColor;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
      } else if (element.mode === "rectangle") {
        ctx.beginPath();
        ctx.globalCompositeOperation = "multiply";
        ctx.strokeStyle = element.Color;

        ctx.lineWidth = element.lineWidth;
        ctx.rect(element.x, element.y, element.height, element.width);
        ctx.fillStyle = element.fillColor;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
      } else if (element.mode === "line") {
        ctx.beginPath();
        ctx.strokeStyle = element.Color;
        ctx.lineTo(element.x1, element.y1);
        ctx.lineTo(element.x2, element.y2);
        ctx.closePath();
        ctx.lineWidth = element.lineWidth;
        ctx.stroke();
      }
    }
  });
}

document
  .getElementById("myhouse")
  .addEventListener("mouseup", function (event) {
    if (event.button === 0) {
      disabled = false;
      mousepressed = false;

      if (mode === "rectangle") {
        ctx.beginPath();
        ctx.globalCompositeOperation = "multiply";
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.rect(prevx, prevy, xdiff, ydiff);

        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        createdDrawings[createdDrawingscounter] = {
          x: prevx,
          y: prevy,
          height: xdiff,
          width: ydiff,
          lineWidth: lineWidth,
          fillColor: fillColor,

          Color: color,
          redraw: true,
          mode: "rectangle",
        };
        createdDrawingscounter++;
      } else if (mode === "circle") {
        ctx.beginPath();
        ctx.globalCompositeOperation = "multiply";
        ctx.strokeStyle = color;

        ctx.lineWidth = lineWidth;
        ctx.arc(prevx, prevy, xdiff, 0, 2 * Math.PI);

        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        createdDrawings[createdDrawingscounter] = {
          x: prevx,
          y: prevy,
          radius: xdiff,
          startAngle: 0,
          endAngle: 360,
          fillColor: fillColor,
          lineWidth: lineWidth,
          Color: color,
          redraw: true,
          mode: "circle",
        };
        createdDrawingscounter++;
      } else if (mode === "line") {
        if (mouseMoved === true) {
          createdDrawings[createdDrawingscounter] = {
            x1: hlinex,
            y1: hliney,
            x2: event.layerX,
            y2: event.layerY,
            Color: color,
            lineWidth: brushSize,
            redraw: true,
            mode: "line",
          };

          createdDrawingscounter++;
        }
      }

      mouseMoved = false;
    } else if (event.button === 2) {
      if (mousepressed === false) {
        createdDrawings[createdDrawingscounter - 1].redraw = false;
        createdDrawingscounter--;
        redraw();
      }
    }
  });

document
  .getElementById("myhouse")
  .addEventListener("mouseout", function (event) {
    mousepressed = false;
  });

document
  .getElementById("erase-all")
  .addEventListener("mousedown", function (event) {
    if (!disabled) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      disabled = true;
      createdDrawings = [];
      createdDrawingscounter = 0;
    } else {
      alert("Canvas is already Clear");
    }
  });

document.getElementById("range").addEventListener("change", function () {
  brushSize = document.getElementById("range").value;
  document.getElementById("p6").textContent = brushSize;
});

document.getElementById("range2").addEventListener("change", function () {
  lineWidth = document.getElementById("range2").value;
  document.getElementById("p12").textContent = lineWidth;
});
document
  .getElementById("circle")
  .addEventListener("mousedown", function (event) {
    mode = "circle";
    thicknessMode = true;
    ThicknessMode();
  });
document
  .getElementById("default")
  .addEventListener("mousedown", function (event) {
    mode = "default";
    thicknessMode = false;
    ThicknessMode();
  });

document
  .getElementById("Rectangle")
  .addEventListener("mousedown", function (event) {
    mode = "rectangle";
    thicknessMode = true;
    ThicknessMode();
  });

document.getElementById("Line").addEventListener("mousedown", function (event) {
  mode = "line";
  thicknessMode = false;
  ThicknessMode();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ControlLeft") {
    ctrlPressed = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (
    ctrlPressed === true &&
    event.code === "KeyZ" &&
    createdDrawingscounter > 0
  ) {
    createdDrawings[createdDrawingscounter - 1].redraw = false;
    createdDrawingscounter--;

    redraw();
  } else if (event.code === "ControlLeft") {
    ctrlPressed = false;
  }
});

function FillColor() {
  fillColor = document.getElementById("FillColor").value;

  if (document.getElementById("FillColor").value !== "none") {
    document.getElementById(
      "FillColor"
    ).style.backgroundColor = document.getElementById("FillColor").value;
  } else {
    fillColor = "white";
  }
}

function ThicknessMode() {
  if (thicknessMode) {
    document.getElementById("p9").style.display = "inline";
    document.getElementById("p12").style.display = "inline";
    document.getElementById("range2").style.display = "inline";
    thicknessMode = false;
  } else {
    document.getElementById("p9").style.display = "none";
    document.getElementById("p12").style.display = "none";
    document.getElementById("range2").style.display = "none";
    thicknessMode = true;
  }
}
