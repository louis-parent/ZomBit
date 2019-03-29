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
    	if(this.dialogLevel == 3 && this.dialingText == "")
    	{
    		this.help.destructor();
            this.help = null;
        	this.dialingText = null;
    		this.texts = null;

    		this.interact = SimpleFollowingNPC.prototype.interact.bind(this)
        	this.update = SimpleFollowingNPC.prototype.update.bind(this);

        	Layers.getLayer("collision").setImage("assets/layers/collision_4a.png");
            Layers.getLayer("background").setImage("assets/layers/background_4a.png");
            
            questTracker.setQuest("Aller dans la salle des serveurs");

        	this.interact();
    	}
    	if(this.dialogLevel == 2 && player.findKey)
    	{
    		this.dialingText = "<center><big>Soldat : C'est bon j'ai la clé et j'en ai profité pour nettoyer l'étage, il ne devrait plus y avoir beaucoup de ces choses.</big></center>";
    		this.texts = ["<center><big>Micloch Malnor : Vous en être sur que c'est sécurisé ?</big></center>",
    					  "<center><big>Soldat : Oui, maintenant suivez moi l'heure tourne. Il vaut mieux sauver tous ces gens le plus vite possible avant qu'il n'en meure plus.</big></center>",
    					  "<center><big>Micloch Malnor : Très bien, mais restez alerte. Je ne veut pas qu'il m'arrive malheur.</big></center>", ""];

    		this.dialogLevel++;
    		this.getState().jhon.following = null;
    	}
    	else if(this.dialogLevel == 1 && this.dialingText == "")
    	{
    		this.dialingText = "<center><big>Micloch Malnor : Mais enfin, c'est dangeureux et rien ne me prouve que vous puissiez m'être utile et puis j'ai entendu plein de bruit qui font peur.</big></center>";

    		this.texts = ["<center><big>Soldat : Très bien restez la pendant que je fait le ménage dans l'étage. Mais après il faudrat me suivre dans la salle des serveurs pour pirater le laboratoire.</big></center>",
    					  "<center><big>Soldat : Tant que vous y ètes passez par la salle des techniciens, c'est là-bas que se trouve la clé qui ouvre la salle des serveurs.</big></center>",
    					  "<center><big>Soldat : Ok merci de l'info.</big></center>", ""];

			this.dialogLevel++;

			player.followedBy = new Array();
        	this.getState().jhon.following = this;
        	this.getState().jhon.interact = function(){};

        	Layers.getLayer("collision").setImage("assets/layers/collision_4.png");
            Layers.getLayer("background").setImage("assets/layers/background_4.png");

           	States.getState("game").maxZombie = 70;
           	
            questTracker.setQuest("Trouver la clé de la salle des serveurs");
    	}
    	else if(this.dialogLevel == 0 && player.isFollowedBy("Jhon Annides"))
    	{
    		this.dialingText = "<center><big>Micloch Malnor : Mais que faîtes vous ici ? Il y a un invasion de ces choses et je doit avouer que j'en ai un peur bleu...</big></center>";
    		this.texts = ["<center><big>Soldat : J'ai besoin de votre aide pour libérer l'antidote et mettre fin à tout ce bordel.</big></center>", ""];
			this.dialogLevel++;
    	}

    	super.interact();
    }
}
