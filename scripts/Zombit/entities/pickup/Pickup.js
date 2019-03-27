class Pickup extends TexturedEntity
{
	constructor(owningState, pickupRange, image = "", x = 0, y = 0, width = 0, height = 0, visible = true, depth = 1)
	{
		super(owningState, x, y, width, height, image, visible, depth);
		
		this.pickupRange = pickupRange;
	}
	
	update()
	{
		if(this.isAround((player.getX() + (player.getWidth() / 2)), (player.getY() + (player.getHeight() / 2)), this.pickupRange))
		{
			this.destructor();
			this.pick();
		}
	}
	
	pick()
	{
		
	}
}
