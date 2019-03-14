class DialogBox extends TexturedEntity
{
	constructor(owningState, text, backgroundImage, margin = 10)
	{
		super(owningState, player.getX(), Game.getGameHeight()*0.75, Game.getGameWidth(), Game.getGameHeight()*0.25, backgroundImage, true, 6000);
		this.text = text;
		this.close = false;

		this.setX(player.getX() + (player.getWidth() / 2) - (Game.getGameWidth() / 2));
		this.setY(player.getY() + (player.getHeight() / 2) + (Game.getGameHeight() * 0.25));

		this.textLabel = new Label(owningState, text, this.getX() + margin, this.getY() + margin, this.getWidth() - margin, this.getHeight() - margin, true, this.getDepth()+1);

		this.addEventListener("keydown", function(){this.close = true;}.bind(this));
	}

	update()
	{
		if(this.close)
		{
			this.destructor();
			currentDialog = null;
		}
		else
		{
			this.textLabel.update();
		}
	}

	destructor()
	{
		super.destructor();
		this.textLabel.destructor();
	}
}
