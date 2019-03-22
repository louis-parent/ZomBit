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
			if(this.following.followedBy.indexOf(this) == -1)
			{
				this.following.followedBy.push(this);
			}
			
			let testX = this.getX() + (this.getWidth() / 2)
			let testY = this.getY() + (this.getHeight() / 2);
			
			let followLeft = this.following.getX() - (this.getWidth() / 2);
			let followRight = this.following.getX() + this.following.getWidth() + (this.getWidth() / 2);
			
			let followTop = this.following.getY() - (this.getHeight() / 2);
			let followBottom = this.following.getY() + this.following.getHeight() + (this.getHeight() / 2);
			
			this.move(followRight < testX ? -this.speed : (followLeft > testX ? this.speed : 0), followBottom < testY ? -this.speed : (followTop > testY ? this.speed : 0));
		}
		else
		{
			if(player.followedBy.indexOf(this) != -1)
			{
				player.followedBy.splice(player.followedBy.indexOf(this), 1);
			}
		}
	}
}
