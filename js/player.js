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

var player = {

	//movement
	x: 0,
	y: 0,
	vX: 0,
	vY: 0,
	moving: false,
	dir: 0,
	speed: 5 / 32,

	//attributes
	health: 100,
	onFire: false,
	tFire: 0, //fire timer

	//drawing
	img: null,
	ndWidth: 21 / 32,
	ndHeight: 27 / 32,

	//sign stuff
	sign: null,
	signText: "Welcome to the game:\na pointless tile-based javascript game.\n\nControls:\n\nMovement: w, a, s, d keys\nKill grass: space key\n\nInstructions: (none)",

	draw: function() {

		if (this.signText && this.signText.split) {

			context.drawImage(this.sign, -128, -128, 256, 256);

			context.font = "15px sans-serif";
			context.fillStyle = "white";

			this.signText = this.signText.split('\n');
			for (var i = 0; i < this.signText.length; i++)
				context.fillText(this.signText[i], -118, -108 + (i * 17));

		} else {

			var frame = 0;

			if (this.moving) frame = (Math.round(t * this.speed) % 4) * 14;
			var cY = this.dir * 18;

			context.drawImage(this.img, frame, cY, 14, 18, -21, -27, 42, 54);

			if (this.onFire) {

				frame = (Math.round(t / 5) % 10) * 15;
				context.drawImage(world.fire, frame, 0, 15, 15, -30, -30, 60, 60);

			}

		}

		context.font = "30px sans-serif";
		context.fillStyle="red";

		context.fillText("Health: " + this.health, -(canvas.dWidth) + 10, (-canvas.dHeight) + 35);

	},

	init: function() {

		this.img = new Image();
		this.img.src = "res/player.png";
		this.img.onload = function() {

			player.sign = new Image();
			player.sign.src = "res/sign.png";
			player.sign.onload = function() { //load images

				eye.init();

			}

		};

	},

	tick: function() {

		this.moving = true;

		if (keyboard.w) {

			this.y -= this.speed;
			this.dir = 3;

		} else if (keyboard.s) {

			this.y += this.speed;
			this.dir = 0;

		} else if (keyboard.a) {

			this.x -= this.speed;
			this.dir = 2;

		} else if (keyboard.d) {

			this.x += this.speed;
			this.dir = 1;

		} else {

			this.moving = false;

		}

		this.x += this.vX;
		this.y += this.vY;

		this.vX--;
		this.vY--;

		if (this.vX < 0) this.vX = 0;
		if (this.vY < 0) this.vY = 0;

		if (keyboard.space) this.moving = true;

		var newMap = null;

		if (this.moving) {

			this.signText = null;

			if (this.health <= 0) {

				this.x = 0;
				this.y = 0;

				this.health = 100;
				this.onFire = false;

				world.loadMap("main.json");
				reDraw = true;

				return;

			}

			var blocks = world.getBlocks(this);
			for (var i = 0; i < blocks.length; i++) {

				var block = blocks[i].val;

				if ((block.id == 1) && (keyboard.space)) {

					world.bContext.drawImage(world.img, 2 * 16, 0, 16, 16, blocks[i].col * 32, blocks[i].row * 32, 32, 32);

				} else if (block.id == 7) newMap = block.val;
				else if (block.id == 8) this.signText = block.val;

			}

			reDraw = true;

		}

		if (this.health <= 0) {

			player.signText = "Congrats: you burned to death.\nWhat were you expecting?";
			reDraw = true;

			return;

		}

		if (this.onFire) {

			if (t % 4 == 0) this.health--;
			if ((t - this.tFire) >= 200) this.onFire = false;

			reDraw = true;

		}

		if (newMap) {

			world.loadMap(newMap.map);
			player.x = newMap.x;
			player.y = newMap.y;

			keyboard.reset();
			reDraw = true;

		}

	}

};
