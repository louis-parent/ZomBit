class Zombie extends TexturedEntity
{
	constructor(owningState)
	{
		super(owningState, Layers.getLayer("background").layer.width * 0.15, Layers.getLayer("background").layer.height * 0.7, player.getWidth(), player.getWidth() * 1.214285714, "assets/entities/zombie/right/zombie_right_walk.gif");


		this.isDying = false;

		this.speedX = 4;
		this.speedY = 4;

		this.targetX = 0;
		this.targetY = 0;
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
			});
		}
	}

	update()
	{
		this.targetX = player.getX();
		this.targetY = player.getY();

		let goX = 0;
		let goY = 0;



		if(this.getX() > this.targetX){
			goX = -this.speedX;
		}else if(this.getX() < this.targetX){
			goX = this.speedX;
		}

		if(this.getY() > this.targetY){
			goY = -this.speedY;
		}else if(this.getY() < this.targetY){
			goY = this.speedY;
		}

		let layer = Layers.getLayer("collision");
		let xBasePercent = (this.getX() / layer.layer.width) * bgWidth;
		let xRightPercent = ((this.getX() + this.getWidth() + goX) / layer.layer.width) * bgWidth;
		let xLeftPercent = ((this.getX() + goX) / layer.layer.width) * bgWidth;
		let yBasePercent = ((this.getY() + this.getHeight()) / layer.layer.height) * bgHeight;
		let yPercent = ((this.getY() + this.getHeight() + goY) / layer.layer.height) * bgHeight;

		if(this.collideWithLayer("collision", xRightPercent, yBasePercent) || this.collideWithLayer("collision", xLeftPercent, yBasePercent)){
			goX = -goX;
		}
		if(this.collideWithLayer("collision", xBasePercent, yPercent)){
			goY = -goY;
		}



		this.move(goX, goY);


		if(goX < 0)
		{
			this.setSprite("assets/entities/zombie/left/zombie_left_walk.gif");
		}
		else
		{
			this.setSprite("assets/entities/zombie/right/zombie_right_walk.gif");
		}


/*
		if(this.collideWithEntity(player))
		{
			player.hit();
		}
*/
	}
}
