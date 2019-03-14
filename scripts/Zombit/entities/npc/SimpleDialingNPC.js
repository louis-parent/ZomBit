class SimpleDialingNPC extends NPC
{
	constructor(owningState, dialingText, name, idleSprite, x, y, width, height)
	{
		super(owningState, name, idleSprite, x, y, width, height);
		this.dialingText = dialingText;
	}
	
	interact()
	{
		alert(this.dialingText);
	}
}
