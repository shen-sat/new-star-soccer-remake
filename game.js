const config = {
	type: Phaser.AUTO,
	width: 1206,
	height: 1812/2,
	backgroundColor: '#000',
	roundPixels: true,
	pixelArt: true,
	parent: 'foobar',
	autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	},
	scene: [ LevelOne ]
};

const game = new Phaser.Game(config);