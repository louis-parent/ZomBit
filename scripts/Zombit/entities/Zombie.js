class Zombie extends TexturedEntity
{
	constructor(owningState, x = Layers.getLayer("background").layer.width * 0.15, y = Layers.getLayer("background").layer.height * 0.7)
	{
		if(x == null && y == null){
			let spawnPoint = Zombie.getSpawnPoint();
			x = spawnPoint[0];
			y = spawnPoint[1];
		}
		super(owningState, x * Layers.getLayer("background").layer.width, y * Layers.getLayer("background").layer.height, player.getWidth(), player.getWidth() * 1.214285714, "assets/entities/zombie/right/zombie_right_walk.gif");

		this.isDying = false;

		this.speedX = 4 + Math.random();
		this.speedY = this.speedX;

		this.targetX = 0;
		this.targetY = 0;

		this.count = 0;

		this.currentSprite = "";
	}

	static getSpawnPoint(){
		let spawnPoints = [[0.1467, 0.7323], [0.1467, 0.1716], [0.7278, 0.1716], [0.7278, 0.7366]]
		return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
	}

	static spawningZombie(){
		zombies.push(new Zombie(States.getState("game"), null, null));
		return zombies.length;
	}

	static spawnArray(spawnPoints, n){
		for(var i = 0; i < n; i++){
			let spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
			zombies.push(new Zombie(States.getState("game"), spawnPoint[0], spawnPoint[1]));
		}
		return zombies.length;
	}


	deathAnimation(target = this, endAction)
	{
		if(target.getAngle() <= -90)
		{
			endAction(target);
		}
		else
		{
			target.rotate(target.angle - 30);
			setTimeout(target.deathAnimation, 50, target, endAction);
		}
	}

	death()
	{
		if(!this.isDying)
		{
			this.isDying = true;

			this.deathAnimation(this, function(t){
				t.destructor();
				zombies.splice(zombies.indexOf(t), 1)[0];
				/*TODO var verSoundMort = Math.random();

				if(verSoundMort<0.25){
					SoundEngine.playSound("ZM1");
				}
				else if (verSoundMort>=0.25 && verSoundMort <0.5) {
					SoundEngine.playSound("ZM2");
				}
				else if (verSoundMort>=0.5 && verSoundMort <0.75) {
					SoundEngine.playSound("ZM3");
				}
				else {
					SoundEngine.playSound("ZM4");
				}*/

			});
		}
	}

	update()
	{
		this.targetX = player.getX();
		this.targetY = player.getY();

		let goX = 0;
		let goY = 0;

		/*TODO var sound=Math.random();

		if (sound<0.005){
			var verSound = Math.random();
			if(verSound < 0.33){
				SoundEngine.playSound("ZD1");

			}
			else if (verSound >= 0.33 && verSound < 0.66) {
				SoundEngine.playSound("ZD2");

			}
			else{
				SoundEngine.playSound("ZD3");

			}

		}*/



		if(this.getX() > this.targetX){
			if(this.getX() - this.targetX < this.speedX){
				goX = - (this.getX() - this.targetX);
			}else{
				goX = -this.speedX;
			}
		}else if(this.targetX > this.getX()){
			if(this.targetX - this.getX() < this.speedX){
				goX = this.targetX - this.getX();
			}else{
				goX = this.speedX;
			}
		}

		if(this.getY() > this.targetY){
			if(this.getY() - this.targetY < this.speedY){
				goY = - (this.getY() - this.targetY);
			}else{
				goY = -this.speedY;
			}
		}else if(this.targetY > this.getY()){
			if(this.targetY - this.getY() < this.speedY){
				goY = this.targetY - this.getY();
			}else{
				goY = this.speedY;
			}
		}

		let layer = Layers.getLayer("collision");
		let xBasePercent = (this.getX() / layer.layer.width) * bgWidth;
		let xRightPercent = ((this.getX() + this.getWidth() + goX) / layer.layer.width) * bgWidth;
		let xLeftPercent = ((this.getX() + goX) / layer.layer.width) * bgWidth;
		let yBasePercent = ((this.getY() + this.getHeight()) / layer.layer.height) * bgHeight;
		let yPercent = ((this.getY() + this.getHeight() + goY) / layer.layer.height) * bgHeight;

		if(this.collideWithLayer("collision", xRightPercent, yBasePercent) || this.collideWithLayer("collision", xLeftPercent, yBasePercent)){
			if(!this.collideWithLayer("collision", ((this.getX() + this.getWidth() - goX) / layer.layer.width) * bgWidth, yBasePercent) && !this.collideWithLayer("collision", ((this.getX() - goX) / layer.layer.width) * bgWidth, yBasePercent))
				goX = -goX;
		}

		if(this.collideWithLayer("collision", xBasePercent, yPercent)){
			if(!this.collideWithLayer("collision", xBasePercent, ((this.getY() + this.getHeight() - goY) / layer.layer.height) * bgHeight))
				goY = -goY;
		}



		this.move(goX, goY);
		let tmpSprite = "";

		if(Math.abs(goX) >= Math.abs(goY) && goX != 0)
		{
			if(goX > 0)
			{

				tmpSprite = "assets/entities/zombie/right/zombie_right_walk.gif";
			}
			else if(goX < 0)
			{
				tmpSprite = "assets/entities/zombie/left/zombie_left_walk.gif";
			}
		}
		else
		{
			if(goY > 0)
			{
				tmpSprite = "assets/entities/zombie/down/zombie_down_walk.gif";
			}
			else if(goY < 0)
			{
				tmpSprite = "assets/entities/zombie/up/zombie_up_walk.gif";
			}
		}

		if(goX == 0 && goY == 0){
			this.count = 0;
		}

		if(this.currentSprite != tmpSprite){
			if(this.count >= 10)
			{
				this.currentSprite = tmpSprite;
				this.setSprite(this.currentSprite);
				this.count = 0;
			}
			else
			{
				this.count++;
			}
		}


		if(this.collideWithEntity(player))
		{
			player.hit();
			/*TODO var verSoundHit=Math.random();
			if (verSoundHit <0.5){
				SoundEngine.playSound("ZH1");
			}
			else{
				SoundEngine.playSound("ZH2");
			}*/
		}

	}
}
