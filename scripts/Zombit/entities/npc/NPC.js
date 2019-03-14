var interactKey = "e";

class NPC extends TexturedEntity
{
	constructor(owningState, name, idleSprite, x, y, width, height)
	{
		super(owningState, x, y, width, height, idleSprite);
		
		this.name = name;
		
		this.nameLabel = new Label("<center>" + name + "</center>", owningState, x, y - 25 - this.height * 0.01, this.width, 25);
		
		this.addEventListener("keydown", this.tryInteract.bind(this));
	}
	
	update()
	{
		this.nameLabel.setX(this.getX());
		this.nameLabel.setY(this.getY() - this.nameLabel.getHeight() - this.getHeight() * 0.01);
	}
	
	tryInteract(e)
	{
		if(e.key == interactKey && this.isAround(player.getX() + (player.getWidth()/2), player.getY() + (player.getHeight()/2), Game.getGameWidth()*0.05))
		{
			this.interact();
		}
	}
	
	interact()
	{
		
	}
}
