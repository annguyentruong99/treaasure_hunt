var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var imgPlayer = document.createElement("img");
imgPlayer.src = "./medias/player.png";

var imgTrap = document.createElement("img");
imgTrap.src = "./medias/trap.png";

var imgTreasure = document.createElement("img");
imgTreasure.src = "./medias/treasure.png";

var screenWidth = 500;
var screenHeight = 500;

var cellWidth = 50;
var cellHeight = 50;

var lenWidth = screenWidth / cellWidth;
var lenHeight = screenHeight / cellHeight;

var map = [
	[0, 0, 0, -1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, -1, 2, 0],
	[0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, -1, 0, 0, , 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 2, 0, -1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, -1, 0, 2, 0, 0],
	[2, 0, -1, 0, 0, 0, 0, 0, 0, 2],
];

var treasureCount = 0;

var drawMap = () => {
	for (let y = 0; y < lenHeight; y++) {
		for (let x = 0; x < lenWidth; x++) {
			if (map[y][x] === -1) {
				context.drawImage(
					imgTrap,
					x * cellWidth,
					y * cellHeight,
					cellWidth,
					cellHeight
				);
			} else if (map[y][x] === 2) {
				context.drawImage(
					imgTreasure,
					x * cellWidth,
					y * cellHeight,
					cellWidth,
					cellHeight
				);
			}
		}
	}
};

var removeTreasure = (x, y) => {
	map[x][y] = 0;
};

var playerXIndex = 0;
var playerYIndex = 0;
for (let y = 0; y < lenHeight; y++) {
	for (let x = 0; x < lenWidth; x++) {
		if (map[y][x] === 1) {
			playerXIndex = x;
			playerYIndex = y;
		} else if (map[y][x] === 2) {
			treasureCount++;
		}
	}
}
console.log(treasureCount);
// document.body.appendChild(imgPlayer) -- test

var player = {
	map: map,
	ctx: context,
	x: playerXIndex * cellWidth,
	y: playerYIndex * cellHeight,
	width: cellWidth,
	height: cellHeight,
	img: imgPlayer,
	treasureCollected: 0,
	draw() {
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	},
	moveRight() {
		if (this.x < screenWidth - cellWidth) {
			this.x += cellWidth;
		}
	},
	moveLeft() {
		if (this.x > 0) {
			this.x -= cellWidth;
		}
	},
	moveUp() {
		if (this.y > 0) {
			this.y -= cellHeight;
		}
	},
	moveDown() {
		if (this.y < screenHeight - cellHeight) {
			this.y += cellHeight;
		}
	},
	checkWin() {
		var xIndex = this.x / cellWidth;
		var yIndex = this.y / cellHeight;
		if (this.map[yIndex][xIndex] === 2) {
			this.treasureCollected++;
			removeTreasure(yIndex, xIndex);
			if (this.treasureCollected === treasureCount) {
				setTimeout(() => {
					alert("You've Win!");
					location.reload();
				}, 100);
			}
		} else if (this.map[yIndex][xIndex] === -1) {
			setTimeout(() => {
				alert("You've lost!");
				location.reload();
			}, 100);
		}
	},
};

var clearScreen = (ctx) => {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, screenWidth, screenHeight);
};

window.onload = () => {
	// player.draw();
	setInterval(() => {
		clearScreen(context);
		player.draw();
		drawMap();
	}, 1);
};

// setTimeout(() => {
//     context.drawImage(imgPlayer, 0, 0, 48, 48);
// }, 2000)

// Catch event of keyboard
window.addEventListener("keydown", (event) => {
	// console.log("event: ", event);
	switch (event.keyCode) {
		case 37:
			player.moveLeft();
			player.checkWin();
			break;
		case 38:
			player.moveUp();
			player.checkWin();
			break;
		case 39:
			player.moveRight();
			player.checkWin();
			break;
		case 40:
			player.moveDown();
			player.checkWin();
			break;
	}
});

// console.log("player: ", player);
