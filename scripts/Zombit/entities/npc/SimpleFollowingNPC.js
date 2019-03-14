class SimpleFollowingNPC extends NPC
{
	constructor(owningState, speed, name, idleSprite, x, y, width, height)
	{
		super(owningState, name, idleSprite, x, y, width, height);
		
		this.speed = speed;
		this.following = null;
	}

	interact()
	{
		if(this.following == null)
		{
			this.following = player;
		}
		else
		{
			this.following = null;
		}
	}
	
	update()
	{
		super.update();
		
		if(this.following != null)
		{
			this.move(this.following.getX() < this.getX() ? -this.speed : (this.following.getX() > this.getX() ? this.speed : 0), this.following.getY() < this.getY() ? -this.speed : (this.following.getY() > this.getY() ? this.speed : 0));
		}
	}
}
