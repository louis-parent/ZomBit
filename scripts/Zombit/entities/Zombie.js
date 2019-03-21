class Zombie extends TexturedEntity
{
	constructor(owningState, x = Layers.getLayer("background").layer.width * 0.15, y = Layers.getLayer("background").layer.height * 0.7)
	{
		super(owningState, x, y, player.getWidth(), player.getWidth() * 1.214285714, "assets/entities/zombie/right/zombie_right_walk.gif");

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

		if(this.getX() == this.targetX){
			if(this.getY() > this.targetY){
				goY = -this.speedY;
			}else if(this.getY() < this.targetY){
				goY = this.speedY;
			}
		}

		if(this.getY() == this.TargetY){
			if(this.getX() > this.targetX){
				goX = this.speedX;
			}else if(this.getX() < this.targetX){
				goX = -this.speedX;
			}
		}

		console.log(goX + "   " + goY);

		let layer = Layers.getLayer("collision");
		let xPercent1 = (this.getX() + goX) / layer.layer.width;
		let xPercent2 = (this.getX() + goX + this.getWidth()) / layer.layer.width;
		let yPercent = (this.getY() + goY + this.getHeight()) / layer.layer.height;

		if(goX < 0)
		{
			this.setSprite("assets/entities/zombie/left/zombie_left_walk.gif");
		}
		else
		{
			this.setSprite("assets/entities/zombie/right/zombie_right_walk.gif");
		}

		if(!this.collideWithLayer("collision", xPercent1 * bgWidth , yPercent * bgHeight) && !this.collideWithLayer("collision", xPercent2 * bgWidth , yPercent * bgHeight))
		{
			this.move(goX, goY);
		}else{
			if(goX != 0){

			}
		}

		if(this.collideWithEntity(player))
		{
			player.hit();
		}
	}
}
