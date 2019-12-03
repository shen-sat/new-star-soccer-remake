class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('pitch', 'assets/pitch.png');
		this.load.image('ball', 'assets/square.png');
		
		
	}

	create() {
		this.pitch = this.physics.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'pitch');
		this.ball = this.physics.add.image(this.cameras.main.width/2 + 50, this.cameras.main.height/2 + 50, 'ball');
		this.ball.setDrag(20, 0)
		
		this.kickButton = this.input.keyboard.addKey('A'); 
	}

	update() {
		if (this.justPressed(this.kickButton)) { this.ball.setVelocityX(50) }
	}

	justPressed(key) {
		if (Phaser.Input.Keyboard.JustDown(key)) { return true }
	}
}