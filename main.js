var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

var width = 500, height = width;

canvas.width = width;
canvas.height = height;

canvas2.width = width;
canvas2.height = height;

var degree = null;

var point = {
  x: width/2,
  y: height/2
};

var trian = {
  hyp: null,
  opp: null,
  adj: null,

  angle: null,
  radian: null
}

var mouse = {
  x: null,
  y: null
};

function setup() {
  
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
  ctx.stroke();
}
setup()

function length(a, b, opt) {
  switch(opt) {
    case 'hyp':
      return Math.sqrt(Math.pow((b.y-a.y), 2) + Math.pow((b.x-a.x), 2));

    case 'adj':
      return Math.sqrt(Math.pow((b.x-a.x), 2));

    case 'opp':
      return Math.sqrt(Math.pow((b.y-a.y), 2));

  }
}

function degreed(angle) {
    return angle * 180 / Math.PI;
}

function update(x, y) {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  ctx2.beginPath();
  ctx2.arc(x, y, 4, 0, 2 * Math.PI);
  ctx2.stroke();
  print();
}

function print() {
  ctx2.beginPath();
  ctx2.moveTo(point.x, point.y);
  ctx2.lineTo(mouse.x, point.y);
  trian.adj = length(point, mouse, 'adj');

  ctx2.moveTo(mouse.x, mouse.y);
  ctx2.lineTo(mouse.x, point.y);
  trian.opp = length(point, mouse, 'opp');

  ctx2.moveTo(mouse.x, mouse.y);
  ctx2.lineTo(point.x, point.y);
  trian.hyp = length(point, mouse, 'hyp');

  trian.radian = Math.atan(trian.opp / trian.adj);
  if(trian.adj < 0) trian.radian =+ Math.PI; 
  trian.angle = degreed(trian.radian);

  document.getElementById('console').innerHTML = "Angle: " + trian.angle;
  document.getElementById('console1').innerHTML = "Radian: "+trian.radian;
  document.getElementById('console2').innerHTML = "Hyp: " + trian.hyp;
  document.getElementById('console3').innerHTML = "Opp: " + trian.opp;
  document.getElementById('console4').innerHTML = "Adj: " + trian.adj;
  document.getElementById('console5').innerHTML = "Mouse X: " + mouse.x;
  document.getElementById('console6').innerHTML = "Mouse Y: " + mouse.y;

  ctx2.stroke();

  ctx2.beginPath();
  ctx2.arc(point.x, point.y, 40, 0, trian.radian);
  ctx2.stroke();
}

document.addEventListener('mousemove', 
  function(e) {
    mouse.x = e.clientX,
    mouse.y = e.clientY;

    update(mouse.x, mouse.y);
  }
);
