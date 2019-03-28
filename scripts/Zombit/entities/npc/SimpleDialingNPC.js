class SimpleDialingNPC extends NPC
{
	constructor(owningState, dialingText, name, idleSprite, x, y, width, height)
	{
		super(owningState, name, idleSprite, x, y, width, height);
		this.dialingText = dialingText;

		this.help = new Label(owningState, "<center><small>Touche E pour interragir</small></center>", x + (width / 2) - ((width * 3) / 2), y + height, width, 25);
		this.help.dom.style.display = "none";
		this.help.dom.style.whiteSpace = "nowrap";

		this.canSpeak = false;
		SoundEngine.loadSound("PNJ", "assets/audio/effects/PNJ.mp3");
		SoundEngine.setSoundVolume("PNJ", 90);
	}
	
	destructor()
	{
		super.destructor();
		
		this.help.destructor();
	}

	update(){
		super.update();

		if(!this.canSpeak && this.isAround(player.getX() + (player.getWidth()/2), player.getY() + (player.getHeight()/2), this.range)){
			this.canSpeak = true;
			this.help.dom.style.display = "block";
		}else if(this.canSpeak && !(this.isAround(player.getX() + (player.getWidth()/2), player.getY() + (player.getHeight()/2), this.range))){
			this.canSpeak = false;
			this.help.dom.style.display = "none";
		}

		if(this.dialingText == null){
			this.canSpeak = false;
			this.help.dom.style.display = "none";
		}

		this.help.setX((this.getX() + (this.getWidth() / 2)) - (this.nameLabel.getWidth() / 2));
		this.help.setY(this.getY() + this.getHeight());
	}

	interact()
	{
		if(currentDialog != null)
		{
			currentDialog.destructor();
		}

		if(this.dialingText != "" && this.dialingText != null)
		{
			SoundEngine.playSound("PNJ");
			currentDialog = new DialogBox(this.getState(), this.dialingText, "assets/hud/background.png", Game.getGameHeight() * 0.03);
			currentDialog.textLabel.dom.innerHTML = "<center>" + currentDialog.textLabel.dom.innerText + "</center>";
		}
		else
		{
			currentDialog = null;
		}
	}
}
