class Computer extends MultiDialingNPC
{
	constructor(owningState)
	{
		let text = ["<center><big>** J'ai l'impression que cet ordinateur pourrait tous nous sauver mais je ne sais pas comment... **</big></center>"];

		super(owningState, text, "", "assets/entities/npc/computer/computer.png", Layers.getLayer("background").getWidth()*0.65, Layers.getLayer("background").getHeight()*0.07, Layers.getLayer("background").getWidth()*0.0448, Layers.getLayer("background").getWidth()*0.0448*0.456);

		super.range = Game.getGameWidth()*0.1;

		this.dialogLevel = 0;
	}

    interact()
	{
	    super.interact();

		if(this.dialogLevel == 1 && this.dialingText == "")
		{
			player.followedBy = new Array();
        	this.getState().micloch.following = null;
        	this.getState().micloch.interact = function(){};
			this.getState().micloch.goToPoint = {x: Layers.getLayer("background").getWidth()*0.6692, y: Layers.getLayer("background").getHeight()*0.0859};

			States.getState("game").maxZombie = 100;
			this.dialogLevel++;
		}
		else if(this.dialogLevel == 0 && player.isFollowedBy("Micloch Malnor"))
		{
			this.dialingText = "<center><big>Micloch Malnor : Je vais faire ce que vous me demandez mais vous vous devez me protéger ! Alors vous restez là et vous vous occupez des mort qui marchent.</big><center>";
			this.texts = ["<center><big>Soldat : Ca me va mais dépéchez vous tout de même...</big></center>", ""];

			this.dialogLevel++;
		}
    }
}
