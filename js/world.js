/*

JGame Development Build
https://github.com/TheBenPerson/JGame

Copyright (C) 2016 Ben Stockett <thebenstockett@gmail.com>

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

var world = {

	bCanvas: null,
	bContext: null,
	data: null,
	dHeight: null,
	dWidth: null,
	oX: null,
	oY: null,
	fire: null,
	height: null,
	img: null,
	map: null,
	width: null,

	draw: function() {

		var x = (player.x * 32) + this.oX;
		var y = (player.y * 32) + this.oY;

		context.drawImage(this.bCanvas, -x, -y);

	},

	init: function() {

		this.img = new Image();
		this.img.src = "res/world.png";
		this.img.onload = function() {

			world.bCanvas = document.createElement("canvas");
			world.bContext = world.bCanvas.getContext("2d");
			world.loadMap("main.json");

			world.fire = new Image();
			world.fire.src = "res/fire.png";
			world.fire.onload = function() {

				player.init();

			};

		};

	},

	loadMap: function(file) {

		var request = new XMLHttpRequest();
		request.open("GET", "map/" + file, false);
		request.send();

		var map = JSON.parse(request.responseText);

		this.width = map.width;
		this.height = map.height;

		this.dWidth = this.width / 2;
		this.dHeight = this.height / 2;

		this.oX = this.dWidth * 32;
		this.oY = this.dHeight * 32;

		this.data = map.data;

		var c = 0;
		for (var i = 0; i < this.data.length; i++) {

			var num = this.data[i];

			if (num > 6) {

				this.data[i] = { id: num, val: map.ref[c++] };

			}

		}

		this.map = file;

		this.bCanvas.width = 32 * this.width;
		this.bCanvas.height = 32 * this.height;

		this.bContext.mozImageSmoothingEnabled = false;
		this.bContext.webkitImageSmoothingEnabled = false;
		this.bContext.imageSmoothingEnabled = false;

		var offset = -32;
		for (var i = 0; i < this.data.length; i++) {

			var texture = this.data[i];
			if (isNaN(texture)) texture = this.data[i].id;

			if (i % this.width == 0)
				offset += 32;

			var x = (i % this.width) * 32;
			var y = offset;

			this.bContext.drawImage(this.img, texture * 16, 0, 16, 16, x, y, 32, 32);

		}

	}

};
