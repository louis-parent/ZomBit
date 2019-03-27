class Garcio extends MultiDialingNPC
{
    constructor(owningState)
    {
    	let toSay =["<center><big>Garcio : SAUVEZ MOI ILS NE ME LACHENT PAS</big></center>", 
    				"<center><big>Soldat : Je suis la monsieur.</big></center>",
    				"<center><big>Garcio : Ils vont bientôt arriver, vite !</big></center>"];
    				
        super(owningState, toSay, "Garcio", "assets/entities/npc/garcio/garcio.png", Layers.getLayer("background").getWidth()*0.35, Layers.getLayer("background").getHeight()*0.8, player.getWidth()*1.1, player.getWidth() * 1.1 * 1.3);

        this.spawned = false;
        this.dialogLevel = 0;
        
        this.following = null;
        this.speed = 8;
    }
    
    update()
    {
    	super.update();
    }

    interact()
    {
        if(this.dialogLevel == 0 && this.dialingText == "" && !this.spawned)
        {
        	this.spawned = true;
        	player.killCount = 0;
        	
            let center = Layers.getLayer("background").getWidth()*0.3;
            let range = Layers.getLayer("background").getWidth()*0.1;
            
            for(let i = 0; i < 6; i++)
            {
                let x = Math.random() * ((center + range) - (center - range)) + (center - range);
                zombies.push(new Zombie(this.getState(), x, Layers.getLayer("background").getHeight()*0.73));
            }
        }
        else if(this.dialogLevel == 0 && player.killCount >= 6)
        {
        	this.dialogLevel++;
        	
        	this.dialingText = "<center><big>Garcio : Merci Soldat.</big></center>";
        	this.texts = ["<center><big>Soldat : Monsieur j'ai besoin de votre aide pour progresser dans le batiment, toute les portes sont fermés.</big></center>",
        				  "<center><big>Garcio : Je suis le directeur du département je possède toute les clés. Je crois que certains de mes collegues sont encore dans leurs salle venez quand vous aurez récupéré votre arme. Je vous accompagner pour les aider.</big></center>",
        				  "<center><big>Soldat : Merci, allons y.</big></center>",
        				  ""];
        	
        }
        else if(this.dialogLevel == 1 && this.dialingText == "")
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
