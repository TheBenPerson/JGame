var eye = {

	x: 7,
	y: 7,

	dir: null,

	img: null,
	ndWidth: 48 / 32,
	ndHeight: 48 / 32,

	draw: function() {

		var frame = Math.round((t / 5) % 15);

		var x = ((this.x - player.x) * 32) - 48;
		var y = ((this.y - player.y) * 32) - 48;
		context.drawImage(this.img, frame * 480, 0, 480, 480, x, y, 96, 96);

	},

	init: function() {

		this.img = new Image();
		this.img.src = "res/eye.png";
		this.img.onload = function() {

			draw(); //draw initial frame
			window.requestAnimationFrame(tick);

		}

	},

	tick: function() {

		if (!(t % 100)) this.dir = Math.random() * 360;

		this.x += Math.cos(this.dir) / 32;
		this.y += Math.sin(this.dir) / 32;

		if ((((player.x + player.ndWidth) > (this.x - this.ndWidth)) && ((player.x - player.ndWidth) < (this.x + this.ndWidth))) && (((player.y + player.ndHeight) > (this.y - this.ndHeight)) && ((player.y - player.ndHeight) < (this.y + this.ndHeight)))) {

			//player.health -= 20;
			player.x += Math.cos(Math.atan((player.y - this.y) / (this.x - player.x)));
			player.y += Math.sin(Math.atan((player.y - this.y) / (this.x - player.x)));

		}

		reDraw = true;

	}

};
