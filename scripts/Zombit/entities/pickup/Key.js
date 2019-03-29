class Key extends Pickup
{
	constructor(owningState)
	{
		super(owningState, Game.getGameWidth()*0.05, "assets/entities/pickup/key/key.png", Layers.getLayer("background").getWidth()*0.55, Layers.getLayer("background").getWidth()*0.62, player.getWidth()*0.75, player.getWidth()*0.75*0.96);
	}
	
	pick()
	{
		this.getState().key = null;
		player.findKey = true;
		
		questTracker.setQuest("Retourner voir Malnor");
	}
}
