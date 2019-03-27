class JhonAnnides extends MultiDialingNPC
{
    constructor(owningState)
    {
    	let toSay =["<center><big><b><i>Jhon Annides</i></b> : Je ne fait pas confiance a quelqu'un qui ne peut pas connecter <b>deux neuronne</b>.</big></center>",
    				"<center><big><b><i>Soldat</i></b> : Mais enfin j'ai besoin de vous pour <b>sauver le monde</b>.</big></center>",
					"<center><big><b><i>Jhon Annides</i></b> : Je n'ai aucune raison de croire que vous avez un quelconque potentiel pour <b>sauver le monde</b>.</big></center>",
					"<center><big><b><i>Soldat</i></b> : Je reviendrai quand vous aurez <b>une raison</b> de me croire.</big></center>"];
    				
        super(owningState, toSay, "Jhon Annides", "assets/entities/npc/ja/jhon_annides.png", Layers.getLayer("background").getWidth()*0.755, Layers.getLayer("background").getHeight()*0.35, player.getWidth()*0.8, player.getWidth() * 0.8 * 1.57);
        
        this.dialogLevel = 0;
        
        super.range = Game.getGameWidth()*0.1;
        
        this.following = null;
        this.goToPoint = null;
        this.speed = 10;
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
    	if(this.dialogLevel == 0 && player.isFollowedBy("Garcio"))
    	{
    		this.dialingText = "<center><big><b><i>Jhon Annides</i></b> : Allez vous en vous n'etes pas capable de nous sauver j'en suis persuadé.</big></center>";
        	this.texts = ["<center><big><b><i>Garcio</i></b> : JHON ouvrez donc ! Ce soldat m'a sauvé la vie et je pense qu'il est capable de nous aider.</big></center>",
						  "<center><big><b><i>Jhon Annides</i></b> : Monsieur Garcio ?? Cous êtes en vie alors ? Bon j'imagine qu'il en est peut etre capable mais de toute façon je ne voit pas en quoi  je peut vous aider. Allez vous en...</big></center>",
						  "<center><big><b><i>Soldat</i></b> : Bon j'en ai marre. j'ai besoin de vous et je rentre de grès ou de force pour qu'on puisse parler et sauver le monde.</big></center>",
						  "<i>***Le soldat enfonce la porte qui se trouve etre ouverte...***<br/>*** Il tombe en enfoncant la porte qui ne montre pas de resistance***",
						  "<center><big><b><i>Jhon Annides</i></b> : Bravo ! Vous venez d'enfoncer une porte ouverte. Vous êtes content désormais ?! Espèce d'imbecile heureux... Et maintenant on fait quoi ?</big></center>", 
						  "<center><big><b><i>Soldat</i></b> : J'ai besoin de vous pour ouvrir la porte de la salle dans laquelle se trouve M. Malnor. Il m'a dit qu'il fallait que je resolve son probleme pour entrer car ça voudrait dire que je ne suis pas un zombie. Mais moi je suis un soldat pas un matheu donc il faut que vous résolviez ça pour moi.</big></center>",
						  "<center><big><b><i>Jhon Annides</i></b> : Bon eh bien allons y puisque vous n'etes pas capable de reussir un simple problème de maths.</big></center>",
        				  ""];
        	this.dialogLevel++;
    	}
    	
    	if(this.dialogLevel == 1 && this.dialingText == "")
    	{
    		this.dialingText = "<center><big><b><i>Jhon Annides</i></b> : Seulement je n'y voit rien... Je vous suivrai quand j'aurai mes lunettes. Retrouvez les pour moi et on ira retrouver M. Malnor.</big></center>";
    		this.texts = ["<center><big><b><i>Soldat</i></b> : Très bien je reviens avec vos lunettes.</big></center>",
    					  ""];
    					  
    		this.dialogLevel++;
    		
    		this.goToPoint = {x: Layers.getLayer("background").getWidth()*0.82, y: Layers.getLayer("background").getHeight()*0.32};
        	
        	player.followedBy = new Array();
        	this.getState().garcio.following = this;
        	this.getState().garcio.interact = function(){};
    	}
    	
    	if(this.dialogLevel == 2 && player.findGlasses)
    	{
    		this.dialingText = "<center><big><b><i>Jhon Annides</i></b> : Merci ! J'y voit enfin plus clair, vous ne ressemblez pas tant que ça à un zombie finallement...</big></center>";
    		this.texts = ["<center><big><b><i>Jhon Annides</i></b> : Allons-y.</big></center>",
    					  ""];
    		this.dialogLevel++;
    		
    		this.getState().garcio.following = null;
    	}
    	
    	if(this.dialogLevel == 3 && this.dialingText == "")
    	{
            this.help.destructor();
            this.help = null;
    		this.dialingText = null;
    		this.texts = null;
    		
    		this.interact = SimpleFollowingNPC.prototype.interact.bind(this)
        	this.update = SimpleFollowingNPC.prototype.update.bind(this);
        	
        	this.interact();
    	}
    	
        super.interact();
    }
}
