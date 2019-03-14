class SimpleDialingNPC extends NPC
{
	constructor(owningState, dialingText, name, idleSprite, x, y, width, height)
	{
		super(owningState, name, idleSprite, x, y, width, height);
		this.dialingText = dialingText;
	}

	interact()
	{
		if(currentDialog != null)
		{
			currentDialog.destructor();
		}
		currentDialog = new DialogBox(this.getState(), this.dialingText, "assets/entities/hud/background.png", Game.getGameHeight() * 0.03);
		currentDialog.textLabel.dom.innerHTML = "<center>" + currentDialog.textLabel.dom.innerText + "</center>";
	}
}
