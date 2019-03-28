var interactKey = "e";

class NPC extends TexturedEntity
{
	constructor(owningState, name, idleSprite, x, y, width, height)
	{
		super(owningState, x, y, width, height, idleSprite);
		
		this.name = name;
		
		this.nameLabel = new Label(owningState, "<center><small>" + name + "</small></center>", x + (width / 2) - ((width * 3) / 2), y - 25 - height * 0.01, width * 3, 25);
		this.nameLabel.dom.style.whiteSpace = "nowrap";
		
		this.range = Game.getGameWidth()*0.05;
		
		this.addEventListener("keydown", this.tryInteract.bind(this));

	}
	
	destructor()
	{
		super.destructor();
		
		this.nameLabel.destructor();
		this.nameLabel = null;
	}
	
	update()
	{
		this.nameLabel.setX((this.getX() + (this.getWidth() / 2)) - (this.nameLabel.getWidth() / 2));
		this.nameLabel.setY(this.getY() - this.nameLabel.getHeight() - this.getHeight() * 0.01);
	}
	
	tryInteract(e)
	{
		if(e.key == interactKey && this.isAround(player.getX() + (player.getWidth()/2), player.getY() + (player.getHeight()/2), this.range))
		{
			this.interact();
		}
	}
	
	interact()
	{
		
	}
}
