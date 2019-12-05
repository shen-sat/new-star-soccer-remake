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
		this.ball.setDamping(true);
		this.ball.setDrag(0.98)
		this.arrow = this.physics.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'arrow');
		this.arrow.setOrigin(0,0.5);
		this.arrowScale = 0.035;
		this.arrow.setScale(this.arrowScale);

		this.keys = this.input.keyboard.createCursorKeys();
		this.kickButton = this.input.keyboard.addKey('A');
		this.ballSpeed = 250;

		


		
	}

	update() {
		this.arrow.setX(this.ball.x);
		this.arrow.setY(this.ball.y);

		if (this.keys.right.isDown) {
			this.arrow.rotation += 0.05
		} else if (this.keys.left.isDown) {
			this.arrow.rotation -= 0.05
		}

		if (this.ball.body.speed < this.ballSpeed * 0.05) {
			this.ball.body.setVelocity(0)

		}

		if (this.justPressed(this.kickButton)) {  
			this.physics.velocityFromRotation(this.arrow.rotation, this.ballSpeed, this.ball.body.velocity);	
		}

		if (this.ball.body.speed > 0) {
			this.arrow.setAlpha(0);
		} else {
			this.arrow.setAlpha(1);
		}








		

		
	}
	


	justPressed(key) {
		if (Phaser.Input.Keyboard.JustDown(key)) { return true }
	}
}