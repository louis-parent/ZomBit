class JhonAnnides extends MultiDialingNPC
{
    constructor(owningState)
    {
    	let toSay =["<center><big>Jhon Annides : Je ne fais pas confiance à quelqu'un qui ne peut pas connecter deux neurones.</big></center>",
    				"<center><big>Soldat : Mais enfin j'ai besoin de vous pour sauver le monde.</big></center>",
					"<center><big>Jhon Annides : Je n'ai aucune raison de croire que vous avez un quelconque potentiel pour sauver le monde.</big></center>",
					"<center><big>Soldat : Je reviendrai quand vous aurez une raison de me croire.</big></center>"];

        super(owningState, toSay, "Jhon Annides", "assets/entities/npc/ja/jhon_annides.png", Layers.getLayer("background").getWidth()*0.755, Layers.getLayer("background").getHeight()*0.35, player.getWidth()*0.8, player.getWidth() * 0.8 * 1.57);

        this.dialogLevel = 0;

        super.range = Game.getGameWidth()*0.1;

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
    	if(this.dialogLevel == 3 && this.dialingText == "")
    	{
            this.help.destructor();
            this.help = null;
    		this.dialingText = null;
    		this.texts = null;

    		this.interact = SimpleFollowingNPC.prototype.interact.bind(this)
        	this.update = SimpleFollowingNPC.prototype.update.bind(this);

        	Layers.getLayer("collision").setImage("assets/layers/collision_3.png");
            Layers.getLayer("background").setImage("assets/layers/background_3.png");
            
        	questTracker.setQuest("Trouver la salle de Micloch Malnor");
        	
        	this.interact();
    	}
    	else if(this.dialogLevel == 2 && player.findGlasses)
    	{
    		this.dialingText = "<center><big>Jhon Annides : Merci ! J'y vois enfin plus clair, vous ne ressemblez pas tant que ça à un zombie finalement...</big></center>";
    		this.texts = ["<center><big>Jhon Annides : Allons-y. Nous avons déja perdu assez de temps comme ça.</big></center>",
    					  ""];
    		this.dialogLevel++;

    		this.getState().garcio.following = null;
    	}
    	else if(this.dialogLevel == 1 && this.dialingText == "")
    	{
    		this.dialingText = "<center><big>Jhon Annides : Seulement je n'y vois rien... Je vous suivrai quand j'aurai mes lunettes. Retrouvez le pour moi et on ira retrouver M. Malnor.</big></center>";
    		this.texts = ["<center><big>Soldat : Très bien je reviens avec vos lunettes.</big></center>",
    					  ""];

    		this.dialogLevel++;

    		this.goToPoint = {x: Layers.getLayer("background").getWidth()*0.82, y: Layers.getLayer("background").getHeight()*0.32};

        	player.followedBy = new Array();
        	this.getState().garcio.following = this;
        	this.getState().garcio.interact = function(){};

            States.getState("game").maxZombie = 30;
            
            questTracker.setQuest("Trouver les lunettes de Jhon");
    	}
    	else if(this.dialogLevel == 0 && player.isFollowedBy("Garcio"))
    	{
    		this.dialingText = "<center><big>Jhon Annides : Allez-vous en vous n'êtes pas capable de nous sauver je suis persuadé que vous ne pouvez pas connecter 2 neurones.</big></center>";
        	this.texts = ["<center><big>Garcio : JHON ouvrez donc ! Ce soldat m'a sauvé la vie et je pense qu'il est capable de nous aider.</big></center>",
						  "<center><big>Jhon Annides : Monsieur Garcio ?? Vous êtes en vie alors . Bon j'imagine qu'il en est peut-être capable mais de toute façon je ne vois pas en quoi je peux vous aider. Allez-vous-en...</big></center>",
						  "<center><big>Soldat : Bon j'en ai marre! j'ai besoin de vous et je rentre de gré ou de force pour qu'on puisse parler et sauver le monde.</big></center>",
						  "***Le soldat enfonce la porte qui se trouve être ouverte...***<br/>*** Il tombe en enfonçant la porte qui ne montre aucune résistance***",
						  "<center><big>Jhon Annides : Bravo ! Vous venez d'enfoncer une porte ouverte. Vous êtes content désormais ?! Espèce d'imbecile heureux... Et maintenant on fait quoi ?</big></center>",
						  "<center><big>Soldat : J'ai besoin de vous pour ouvrir la porte de la salle dans laquelle se trouve M. Malnor. Il m'a dit qu'il fallait que je resolve son problème pour entrer car ça voudrait dire que je ne suis pas un zombie. Mais moi je suis un soldat pas un matheux donc il faut que vous résolviez ça pour moi.</big></center>",
						  "<center><big>Jhon Annides : Bon eh bien allons-y puisque vous n'êtes pas capable de réussir un simple problème de maths.</big></center>",
        				  ""];
        	this.dialogLevel++;

        	Layers.getLayer("collision").setImage("assets/layers/collision_2a.png");
            Layers.getLayer("background").setImage("assets/layers/background_2a.png");
    	}

        super.interact();
    }
}
