class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('pitch', 'assets/sensible-pitch.png');
		this.load.image('ball', 'assets/square.png');
		this.load.image('arrow', 'assets/line.png');
		this.load.image('post-left', 'assets/goal-post-left.png');
		this.load.image('post-right', 'assets/goal-post-right.png');
		this.load.image('net-boundary', 'assets/net-boundary.png');
	}

	create() {
		this.pitch = this.physics.add.image(this.cameras.main.width/2, this.cameras.main.height - 120, 'pitch');
		this.ball = this.physics.add.image(this.cameras.main.width/2 + 50, this.cameras.main.height/2 + 50, 'ball');
		this.ball.setScale(0.75)
		this.ball.setDamping(true);
		this.ball.setDrag(0.98)
		this.arrow = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'arrow');
		this.arrowScale = 1.5;
		this.arrow.setScale(this.arrowScale);
		this.arrow.setOrigin(0,0.5);

		this.keys = this.input.keyboard.createCursorKeys();
		this.kickButton = this.input.keyboard.addKey('A');
		this.ballSpeed = 150;

		this.arrowStartingScale = this.arrowScale;
		this.arrowScaleXMax = 3.5;
		this.ballStartingSpeed = this.ballSpeed;
		this.ballMaxSpeed = 500;

		this.ballKickable = true;

		this.goalBoundaries = this.physics.add.staticGroup();

		this.postLeft = this.physics.add.staticImage(530, 209, 'post-left');
		this.postRight = this.physics.add.staticImage(672, 209, 'post-right');
		this.netBoundary = this.physics.add.staticImage(this.cameras.main.width/2 - 2, this.cameras.main.height/2 - 244, 'net-boundary');

		this.goalBoundaries.add(this.postLeft)
		this.goalBoundaries.add(this.postRight)
		this.goalBoundaries.add(this.netBoundary)
		
		this.physics.add.collider(this.ball, this.goalBoundaries);
		this.ball.setBounce(0.75,0.75);
	}

	update() {
		//reset
		this.arrow.setX(this.ball.x);
		this.arrow.setY(this.ball.y);

		if (this.keys.right.isDown) {
			this.arrow.rotation += 0.05
		} else if (this.keys.left.isDown) {
			this.arrow.rotation -= 0.05
		}

		if (this.keys.up.isDown) {
			this.arrow.scaleX = Math.min(this.arrow.scaleX + 0.02, this.arrowScaleXMax)
			this.ballSpeed = this.ballStartingSpeed + ((this.ballMaxSpeed - this.ballStartingSpeed)/(this.arrowScaleXMax - this.arrowStartingScale)) * (this.arrow.scaleX - this.arrowStartingScale)

		}

		if (this.ball.body.speed < this.ballSpeed * 0.025) {
			this.ball.body.setVelocity(0)

		}

		if (this.justPressed(this.kickButton) && this.ballKickable) {  
			this.physics.velocityFromRotation(this.arrow.rotation, this.ballSpeed, this.ball.body.velocity);	
		}

		if (this.ball.body.speed > 0) {
			this.ballKickable = false;
			this.arrow.setAlpha(0);
			this.arrow.scaleX = this.arrowStartingScale
			this.ballSpeed = this.ballStartingSpeed
		} else {
			
			this.ballKickable = true
			this.arrow.setAlpha(1);
		}
		
	}
	


	justPressed(key) {
		if (Phaser.Input.Keyboard.JustDown(key)) { return true }
	}
}