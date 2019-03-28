class Glasses extends Pickup
{
	constructor(owningState)
	{
		super(owningState, Game.getGameWidth()*0.05, "assets/entities/pickup/glasses/glasses.png", Layers.getLayer("background").getWidth()*0.25, Layers.getLayer("background").getWidth()*0.62, player.getWidth()*0.75, player.getWidth()*0.75*0.67);
	}
	
	pick()
	{
		this.getState().glasses = null;
		player.findGlasses = true;
	}
}
