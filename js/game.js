window.onload = init;
var canvas;
var context;

var keyboard = {

	w: false,
	s: false,
	a: false,
	d: false,
	space: false,

	keyDown: function(event) {

		if (event.key == 'w') keyboard.w = true;
		else if (event.key == 's') keyboard.s = true;
		else if (event.key == 'a') keyboard.a = true;
		else if (event.key == 'd') keyboard.d = true;
		else if (event.key == ' ') {

			keyboard.space = true;
			event.preventDefault();

		} else if (event.key == 'f') {

			document.getElementById("article").mozRequestFullScreen();

		}

	},

	keyUp: function(event) {

		if (event.key == 'w') keyboard.w = false;
		else if (event.key == 's') keyboard.s = false;
		else if (event.key == 'a') keyboard.a = false;
		else if (event.key == 'd') keyboard.d = false;
		else if (event.key == ' ') keyboard.space = false;

	},

	reset: function() {

		this.w = false;
		this.s = false;
		this.a = false;
		this.d = false;
		this.space = false;

	}

};

function draw() {

	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.translate(canvas.dWidth, canvas.dHeight);

	world.draw();
	player.draw();

}

function init() {

	canvas = document.getElementsByTagName("canvas")[0];

	canvas.width = canvas.parentNode.clientWidth;
	canvas.height = window.innerHeight;

	if (canvas.width % 2 != 0) canvas.width--;
	canvas.dWidth = canvas.width / 2;

	if (canvas.height % 2 != 0) canvas.height--;
	canvas.dHeight = canvas.height / 2;

	context = canvas.getContext("2d");

	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;

	context.font = "30px sans-serif";
	context.fillStyle = "white";
	context.fillText("Loading...", 10, 35);

	window.addEventListener("keydown", keyboard.keyDown);
	window.addEventListener("keyup", keyboard.keyUp);
	window.addEventListener("resize", onResize);

	world.init();

}

function onResize() {

	if (!document.mozFullScreen) {

		canvas.width = canvas.parentNode.clientWidth;
		canvas.height = window.innerHeight;

	} else {

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

	}

	if (canvas.width % 2 != 0) canvas.width--;
	canvas.dWidth = canvas.width / 2;

	if (canvas.height % 2 != 0) canvas.height--;
	canvas.dHeight = canvas.height / 2;

	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;
	context.font = "30px sans-serif";

	draw();

}

var t = 0;
var reDraw;

function tick() {

	reDraw = false;

	player.tick();
	t++;

	if (reDraw) draw();
	window.requestAnimationFrame(tick);

}
