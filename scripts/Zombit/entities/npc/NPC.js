var interactKey = "e";

class NPC extends TexturedEntity
{
	constructor(owningState, name, idleSprite, x, y, width, height)
	{
		super(owningState, x, y, width, height, idleSprite);
		
		this.name = name;
		
		this.nameLabel = new Label(owningState, "<center>" + name + "</center>", x + (width / 2) - ((width * 3) / 2), y - 25 - height * 0.01, width * 3, 25);
		this.nameLabel.dom.style.whiteSpace = "nowrap";

		this.help = new Label(owningState, "<center><small>Touche E pour parler</small></center>", x + (width / 2) - ((width * 3) / 2), y + height, width, 25);
		this.help.dom.style.display = "none";
		this.help.dom.style.whiteSpace = "nowrap";
		
		this.range = Game.getGameWidth()*0.05;
		
		this.addEventListener("keydown", this.tryInteract.bind(this));

		this.canSpeak = false;
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

		if(!this.canSpeak && this.isAround(player.getX() + (player.getWidth()/2), player.getY() + (player.getHeight()/2), this.range)){
			this.canSpeak = true;
			this.help.dom.style.display = "block";
		}else if(this.canSpeak && !(this.isAround(player.getX() + (player.getWidth()/2), player.getY() + (player.getHeight()/2), this.range))){
			this.canSpeak = false;
			this.help.dom.style.display = "none";
		}

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
