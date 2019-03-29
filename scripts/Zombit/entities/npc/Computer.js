class Computer extends MultiDialingNPC
{
	constructor(owningState)
	{
		let text = ["<center><big>** J'ai l'impression que cet ordinateur pourrait tous nous sauver mais je ne sais pas comment... **</big></center>"];

		super(owningState, text, "", "assets/entities/npc/computer/computer.png", Layers.getLayer("background").getWidth()*0.65, Layers.getLayer("background").getHeight()*0.07, Layers.getLayer("background").getWidth()*0.0448, Layers.getLayer("background").getWidth()*0.0448*0.456);

		super.range = Game.getGameWidth()*0.1;

		this.dialogLevel = 0;
	}
	
	update()
	{
		if(this.dialogLevel == 2 && this.getState().maxZombie <= 20)
		{
		    questTracker.setQuest("Parler à Malnor");
		        	
			this.dialogLevel++;
			this.dialingText = "<center><big>Micloch Malnor : C'est bon ! L'antidote est répandu !</big></center>";
			this.texts = ["<center><big>Soldat : Merci de m'avoir aidé. Vous pourrez dire que vous avez sauvé la terre.</big></center>", 
						  "<center><big>Micloch Malnor : D'accord mais restez par ici le temps d'être sûr que tout le monde est retourné à la normale. Il est possible que certaines de ces atrocités trainent encore dans les parages...</big></center>", "<center><big> -- FIN -- </big></center>", "** BUG **", ""];
			
			player.setX(Layers.getLayer("background").getWidth()*0.6692);
			player.setY(Layers.getLayer("background").getHeight()*0.1048);
			
			this.interact();
		}
		
		super.update();
	}

    interact()
	{
	    super.interact();
		
		if(this.dialogLevel == 3 && this.dialingText == "")
		{
			States.goToState("home");
		}
		else if(this.dialogLevel == 1 && this.dialingText == "")
		{
			player.followedBy = new Array();
        	this.getState().micloch.following = null;
        	this.getState().micloch.interact = function(){};
			this.getState().micloch.goToPoint = {x: Layers.getLayer("background").getWidth()*0.6692, y: Layers.getLayer("background").getHeight()*0.0859};

			States.getState("game").maxZombie = 70;
			this.dialogLevel++;
			
			questTracker.setQuest("Proteger Malnor des zombies");
		}
		else if(this.dialogLevel == 0 && player.isFollowedBy("Micloch Malnor"))
		{
			this.dialingText = "<center><big>Micloch Malnor : Je vais faire ce que vous me demandez mais vous vous devez me protéger ! Alors vous restez là et vous vous occupez des morts qui marche.</big><center>";
			this.texts = ["<center><big>Soldat : Ça me va mais dépéchez-vous tout de même...</big></center>", ""];

			this.dialogLevel++;
		}
    }
}
