const config = {
	type: Phaser.AUTO,
	width: 480,
	height: 240,
	backgroundColor: '#000',
	roundPixels: true,
	pixelArt: true,
	parent: 'foobar',
	autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	physics: {
		default: 'arcade',
	},
	scene: [ LevelOne ]
};

const game = new Phaser.Game(config);