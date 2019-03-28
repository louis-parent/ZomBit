class PostIt extends MultiDialingNPC
{
	constructor(owningState)
	{
		let text = ["-- Pour entrer vous devez résoudre un problème mathématique que seul les non zombies peuvent résoudre --<br/>PS : Si vous êtes idiot vous risquer de ne pas pouvoir le résoudre (Peut être qu'on prof pourra vous y aider)"];
		
		super(owningState, text, "", "assets/entities/npc/postit/postit.png", Layers.getLayer("background").getWidth()*0.145, Layers.getLayer("background").getHeight()*0.15, Layers.getLayer("background").getWidth()*0.005, Layers.getLayer("background").getWidth()*0.005);
		
		super.range = Game.getGameWidth()*0.1;
	}
	
    interact()
	{
	    super.interact();
	    
		if(player.isFollowedBy("Jhon Annides"))
		{
			this.destructor();
			this.getState().postit = null;
		}
    }
}
