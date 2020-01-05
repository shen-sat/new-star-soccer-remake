class LevelOne extends Phaser.Scene {

	constructor() {
		super({key: 'LevelOne'});
	}

	preload() {
		this.load.image('pitch', 'assets/sensible-pitch-bw-no-line.png');
		this.load.image('arrow', 'assets/line-v3.png');
		this.load.image('post-left', 'assets/goal-post-left.png');
		this.load.image('post-right', 'assets/goal-post-right.png');
		this.load.image('net-boundary', 'assets/net-boundary.png');
		this.load.spritesheet('ball', 'assets/rotating-ball-v2.png', { frameWidth: 10, frameHeight: 10 }, 8);
	}

	create() {
		//Pitch
		this.pitch = this.physics.add.image(this.cameras.main.width/2, this.cameras.main.height - 120, 'pitch');
		//Arrow
		this.arrow = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'arrow');
		this.arrowScale = 1.5;
		this.arrow.setScale(this.arrowScale);
		this.arrow.setOrigin(0,0.5);
		this.arrow.rotation = this.arrow.rotation - 1.570796;
		this.arrowStartingScale = this.arrowScale;
		this.arrowScaleXMax = 3.5;
		//Ball
		this.ball = this.physics.add.sprite(this.cameras.main.width/2 + 50, this.cameras.main.height/2 + 50, 'ball');
		this.ball.setDamping(true);
		this.ball.setDrag(0.98)
		this.ballSpeed = 150;
		this.ballStartingSpeed = this.ballSpeed;
		this.ballMaxSpeed = this.ballSpeed * 3;
		this.ballKickable = true;
		this.ball.setBounce(0.75,0.75);
		this.ballDirection = 0;
		this.curlUnit = 0.00001745329001 * 1.25
		this.curlMax = this.curlUnit * 200
		this.ballCurl = 0
		this.savedBallCurl = 0;
		//Goal
		this.postLeft = this.physics.add.staticImage(530, 209, 'post-left');
		this.postRight = this.physics.add.staticImage(672, 209, 'post-right');
		this.netBoundary = this.physics.add.staticImage(this.cameras.main.width/2 - 2, this.cameras.main.height/2 - 244, 'net-boundary');
		this.posts = this.physics.add.staticGroup();
		this.posts.add(this.postLeft)
		this.posts.add(this.postRight)
		//Buttons
		this.keys = this.input.keyboard.createCursorKeys();
		this.kickButton = this.input.keyboard.addKey('A');
		this.curlLeftButton = this.input.keyboard.addKey('O');
		this.curlRightButton = this.input.keyboard.addKey('P');
		//Colliders
		this.physics.add.collider(this.ball, this.posts);
		this.physics.add.collider(this.ball, this.netBoundary, this.stopBall, null, this);
		//Animations
		this.anims.create({
			key: 'roll',
			frames: this.anims.generateFrameNumbers('ball', { frames: [0,1,2,3,4,5,6,7,8,9]}),
			frameRate: 12,
			repeat: -1
		});

		
	}

	update() {
		//Attach arrow to ball
		this.arrow.setX(this.ball.x);
		this.arrow.setY(this.ball.y);
		//Get bal to face arrow direction
		this.ball.rotation = this.arrow.rotation + 1.570796;  //90 degrees in radians
		//Button actions
		if (this.keys.right.isDown) {
			this.arrow.rotation += 0.05
		} else if (this.keys.left.isDown) {
			this.arrow.rotation -= 0.05
		}
		if (this.keys.up.isDown) {
			this.arrow.scaleX = Math.min(this.arrow.scaleX + 0.02, this.arrowScaleXMax)
			this.ballSpeed = this.ballStartingSpeed + ((this.ballMaxSpeed - this.ballStartingSpeed)/(this.arrowScaleXMax - this.arrowStartingScale)) * (this.arrow.scaleX - this.arrowStartingScale)
		}
		if (this.curlLeftButton.isDown) {
			this.ballCurl = Math.min(this.curlMax, this.ballCurl + this.curlUnit)
		}
		if (this.curlRightButton.isDown) {
			this.ballCurl = Math.max(-this.curlMax, this.ballCurl - this.curlUnit)
		}
		//Adjust ball stop speed
		this.speedUpBallStop()
		//Apply curl
		this.ballDirection += this.savedBallCurl 
		this.physics.velocityFromRotation(this.ballDirection, this.ball.body.speed, this.ball.body.velocity) 
		//Ball start and stop actions
		if (this.ball.body.speed > 0) {
			this.ballKickable = false;
			this.arrow.setAlpha(0);
			this.arrow.scaleX = this.arrowStartingScale
			this.ballSpeed = this.ballStartingSpeed
			this.ball.play('roll', true);
			this.ball.anims.setTimeScale(this.ball.body.speed/50); //this will have to be adjusted depending on 'feel' of roll
		} else {
			this.ball.anims.stop()
			this.ballKickable = true
			this.arrow.setAlpha(1);
		}
		//Apply kick
		if (this.justPressed(this.kickButton) && this.ballKickable) {  
			this.physics.velocityFromRotation(this.arrow.rotation, this.ballSpeed, this.ball.body.velocity);
			this.ballDirection = this.arrow.rotation; //For curl
			this.savedBallCurl = this.ballCurl; //save curl so it can be used in next loops
			this.ballCurl = 0; //reset curl for next kick
		}
		
	}
	
	justPressed(key) {
		if (Phaser.Input.Keyboard.JustDown(key)) { return true }
	}

	stopBall() {
		this.ball.body.setVelocity(0)

	}

	speedUpBallStop() {
		if (this.ball.body.speed < this.ballSpeed * 0.025) {
			this.stopBall()
		}
	}

}