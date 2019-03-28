class MiclochMalnor extends MultiDialingNPC
{
	constructor(owningState)
	{
			let toSay =["<center><big>Micloch Malnor : Mais comment avais vous fait ?! Ce dialogue n'est pas censé être visible !.</big></center>",
    				"<center><big>Soldat : Et bien je suis plutôt fort... J'ai soit trouvé un bug soit triché ;).</big></center>"];
    				
        super(owningState, toSay, "Micloch Malnor", "assets/entities/npc/mm/micloch_malnor.png", Layers.getLayer("background").getWidth()*0.05, Layers.getLayer("background").getHeight()*0.1, player.getWidth()*0.8, player.getWidth() * 0.8 * 1.57);
        
        this.dialogLevel = 0;
        
        this.following = null;
        this.goToPoint = null;
        this.speed = 9;
	}
	
	update()
    {
    	if(this.goToPoint != null && this.following == null)
    	{
    		let mvX = 0;
    		let mvY = 0;
    		
    		if(this.goToPoint.x > this.getX())
    		{
    			mvX = this.speed;
    		}
    		if(this.goToPoint.y < this.getY())
    		{
    			mvY = -this.speed;
    		}
    		
    		if(this.goToPoint.x <= this.getX() && this.goToPoint.y >= this.getY())
    		{
    			this.goToPoint = null;
    		}
    		
    		this.move(mvX, mvY);
    	}
    
    	super.update();
    }
    
    interact()
    {
    	if(this.dialogLevel == 1 && this.dialingText == "")
    	{
    		this.dialingText = "<center><big>Micloch Malnor : Mais avant il faut que je trouve une quête annexe a vous donner... Revenez quand j'en aurais une..</big></center>";
    		
    		this.texts = ["<center><big>Soldat : D'accords... J'ai juste une question, vous ne venez pas de casser le quatrième mur ?.</big></center>",
					"<center><big>Micloch Malnor : Il ne fallait pas choisir la pilule rouge garçon.</big></center>",
					"<center><big>Soldat : Bien vu que j'ai pas le choix je repasserai plus tard.</big></center>", ""];
					
			this.dialogLevel++;
			
			player.followedBy = new Array();
        	this.getState().jhon.following = this;
        	this.getState().jhon.interact = function(){};
    	}
    	else if(this.dialogLevel == 0 && player.isFollowedBy("Jhon Annides"))
    	{
    		this.dialingText = "<center><big>Micloch Malnor : Comment avez-vous fait pour rentrer ?.</big></center>";
    		this.texts = ["<center><big>Soldat : Grace à l'aide de M. Annides.</big></center>",
					"<center><big>Micloch Malnor : Qu'est ce que vous me voulez ?.</big></center>",
					"<center><big>Soldat : Nous avons besoins de vous afin de pirater le serveur de Zontic.</big></center>", ""];
					this.dialogLevel++;
    	}
    	
    	super.interact();
    }
}
