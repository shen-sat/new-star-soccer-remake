const config = {
	type: Phaser.AUTO,
	width: 512,
	height: 512,
	backgroundColor: '#88F',
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