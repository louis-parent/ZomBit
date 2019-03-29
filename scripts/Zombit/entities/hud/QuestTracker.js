class QuestTracker extends Label
{
	constructor(owningState, firstQuest)
	{
		let x = (player.getX() + (player.getWidth() / 2)) + (Game.getGameWidth() / 2) - (Game.getGameWidth() * 0.2);
		let y = (player.getY() + (player.getHeight() / 2)) + (Game.getGameHeight() / 2) - (Game.getGameHeight() * 0.05);
		
		super(owningState, "<left><big>Quête en cours : </big><br/> - " + firstQuest + "</left>", x, y, Game.getGameWidth() * 0.2, Game.getGameHeight() * 0.05, true, 10000);
	}
	
	update()
	{
		this.setX((player.getX() + (player.getWidth() / 2)) + (Game.getGameWidth() / 2) - (Game.getGameWidth() * 0.2));
		this.setY((player.getY() + (player.getHeight() / 2)) - (Game.getGameHeight() / 2) + (Game.getGameHeight() * 0.05));
	}
	
	setQuest(quest)
	{
		this.setText("<left><big>Quête en cours : </big><br/> - " + quest + "</left>");
	}
}
