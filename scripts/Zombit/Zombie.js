class Zombie extends TexturedEntity
{
	constructor()
	{
		super(1000, (Math.random() * (3750 - 750) + 750), player.getWidth(), player.getWidth() * 1.214285714, "assets/entities/zombie/right/zombie_right_walk.gif");
		
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
		this.isDying = true;
		
		this.deathAnimation(this, function(t){
			t.destructor();
			zombies.splice(zombies.indexOf(t), 1)[0];
		});
	}
	
	update()
	{
		this.targetX = player.getX();
		this.targetY = player.getY();
		
		
		let goX = (this.targetX < this.getX() ? -this.speedX : this.speedX);
		let goY = (this.targetY < this.getY() ? -this.speedY : this.speedY);
		
		let layer = Layers.getLayer("collision");
		let xPercent = (this.getX() + goX) / layer.layer.width;
		let yPercent = (this.getY() + goY) / layer.layer.height;

		if(!this.collideWithLayer("collision", xPercent * bgWidth , yPercent * bgHeight))
		{
			this.move(goX, goY);
		}
	}
}
