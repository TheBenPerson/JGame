var player = {

	health: 100,
	ndWidth: 21 / 32,
	ndHeight: 27 / 32,
	x: 0,
	y: 0,
	dir: 0,
	speed: 5 / 32,
	img: null,
	onFire: false,
	water: null,
	inWater: false,
	tFire: 0,

	draw: function() {

		var frame = (Math.round(t * this.speed) % 4) * 14;
		var cY = this.dir * 18;

		context.drawImage(this.img, frame, cY, 14, 18, -21, -27, 42, 54);

		if (this.onFire) {

			frame = (Math.round(t / 5) % 10) * 15;
			context.drawImage(world.fire, frame, 0, 15, 15, -30, -30, 60, 60);

		}

		context.fillStyle="red";
		context.fillText("Health: " + this.health, -(canvas.dWidth) + 10, (-canvas.dHeight) + 35);


	},

	init: function() {

		this.img = new Image();
		this.img.src = "res/player.png";
		this.img.onload = function() {

			alert("Welcome to the game: a pointless tile-based javascript game.\n\nControls:\n\n\tMovement: w, a, s, d keys\n\tKill grass: space key\n\tSet fullscreen: f key\n\nInstructions: (none)");

			draw();
			window.requestAnimationFrame(tick);

		};

	},

	tick: function() {

		var moving = true;

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

			moving = false;

		}

		if (keyboard.space) moving = true;

		var teleporter = null;

		if (moving) {

			var minX = Math.floor((world.dWidth) + this.x - this.ndWidth);
			var maxX = Math.ceil((world.dWidth) + this.x + this.ndWidth);

			var minY = Math.floor((world.dHeight) + this.y - this.ndHeight);
			var maxY = Math.ceil((world.dHeight) + this.y + this.ndHeight);

			var bump = false;
			var sign = -1;

			for (var r = minY; r < maxY; r++) {

				for (var c = minX; c < maxX; c++) {

					var Index = (r * world.width) + c;
					var block = world.data[Index];

					if (block == 0) bump = true;

					if (isNaN(block) && moving) {

						switch (block.id) {

							case 7:

								teleporter = block.val;

							break;
							case 8:

								sign = block.val;
								bump = true;

							break;

						}

					}

					if (block == 4) {

						this.onFire = false;

					} else if (block == 6) {

						this.onFire = true;
						this.tFire = t;

					} else if (block == 1 && keyboard.space) {

						world.data[Index] = 2;
						world.bContext.drawImage(world.img, 2 * 16, 0, 16, 16, (c % world.width) * 32, r * 32, 32, 32);

					}

				}

			}

			if (bump) {

				if (this.dir == 3) this.y = maxY - world.dHeight - (2 - this.ndHeight);
				else if (this.dir == 0) this.y = minY - world.dHeight + (2 - this.ndHeight);
				else if (this.dir == 2) this.x = maxX - world.dWidth - (2 - this.ndWidth);
				else if (this.dir == 1) this.x = minX - world.dWidth + (2 - this.ndWidth);

			}

			if (isNaN(sign)) {

				alert("Wow, a sign!!\n\nIt reads: \n\n" + sign);

				keyboard.w = false;
				keyboard.s = false;
				keyboard.a = false;
				keyboard.d = false;

			}

			reDraw = true;

		}

		if (this.health <= 0) {

			alert("Congrats: you burned to death.\nWhat were you expecting?");

			this.x = 0;
			this.y = 0;

			this.health = 100;
			this.onFire = false;

			keyboard.reset();

			if (world.map != "main.json") world.loadMap("main.json");
			else reDraw = true;

		}

		if (this.onFire) {

			if (t % 4 == 0) this.health--;
			if ((t - this.tFire) >= 200) this.onFire = false;

			reDraw = true;

		}

		if (teleporter) {

			world.loadMap(teleporter.map);
			player.x = teleporter.x;
			player.y = teleporter.y;

			keyboard.reset();
			reDraw = true;

		}

	}

};
