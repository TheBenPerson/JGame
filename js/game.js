/*

JGame Development Build
https://github.com/TheBenPerson/JGame

Copyright (C) 2016 - 2017 Ben Stockett <thebenstockett@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

window.onload = init; //call init when page has loaded

var canvas;
var context;

var keyboard = {

	w: false,
	s: false,
	a: false,
	d: false,
	space: false,

	keyDown: function(event) {

		keyboard.w = (event.key == 'w');
		keyboard.s = (event.key == 's');
		keyboard.a = (event.key == 'a');
		keyboard.d = (event.key == 'd');

		if (event.key == ' ') {

			keyboard.space = true;
			event.preventDefault();

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

	context.setTransform(1, 0, 0, 1, 0, 0); //reset previous transformations
	context.clearRect(0, 0, canvas.width, canvas.height); //clear screen
	context.translate(canvas.dWidth, canvas.dHeight); //(0, 0) is now the center of screen

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

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.width % 2) canvas.width--;
	canvas.dWidth = canvas.width / 2;

	if (canvas.height % 2) canvas.height--;
	canvas.dHeight = canvas.height / 2;

	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;
	context.font = "30px sans-serif";

	draw();

}

var t = 0; //timer variable
var reDraw;

function tick() {

	reDraw = false;

	player.tick();
	t++;

	if (reDraw) draw();
	window.requestAnimationFrame(tick);

}
