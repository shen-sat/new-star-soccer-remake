class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('pitch', 'assets/pitch.png');
		this.load.image('ball', 'assets/square.png');
		this.load.image('arrow', 'assets/arrow.png');
		
		
	}

	create() {
		this.pitch = this.physics.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'pitch');
		this.ball = this.physics.add.image(this.cameras.main.width/2 + 50, this.cameras.main.height/2 + 50, 'ball');
		this.ball.setDrag(20, 0)
		this.arrow = this.physics.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'arrow');
		this.arrowScale = 0.035;
		this.arrow.setScale(this.arrowScale);
		
		this.kickButton = this.input.keyboard.addKey('A'); 
		this.arrow.anchor.setTo(this0.5 * 0.035, 0.5)
	}

	update() {
		if (this.justPressed(this.kickButton)) { this.ball.setVelocityX(50) }

		this.arrow.setX(this.ball.x + (this.arrow.width/2 * this.arrowScale));
		this.arrow.setY(this.ball.y);
	}
	


	justPressed(key) {
		if (Phaser.Input.Keyboard.JustDown(key)) { return true }
	}
}