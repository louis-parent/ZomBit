class Garcio extends MultiDialingNPC
{
    constructor(owningState)
    {
    	let toSay =["<center><big>Garcio : SAUVEZ MOI ILS NE ME LACHENT PAS</big></center>", 
    				"<center><big>Soldat : Je suis la monsieur.</big></center>",
    				"<center><big>Garcio : Ils vont bientôt arriver, vite !</big></center>"];
    				
        super(owningState, toSay, "Garcio", "assets/entities/npc/garcio/garcio.png", Layers.getLayer("background").getWidth()*0.35, Layers.getLayer("background").getHeight()*0.8, player.getWidth()*1.1, player.getWidth() * 1.1 * 1.3);

        this.spawned = false;
        this.didSpawn = false;
        
        this.dialogLevel = 0;
        
        this.following = null;
        this.speed = 9;
    }
    
    update()
    {
    	if(this.spawned && !this.didSpawn)
    	{
    		this.didSpawn = true;
    		
    		Zombie.spawnArray([[0.4098, 0.7345], [0.3742, 0.7345], [0.3246, 0.7345], [0.2664, 0.7345]], 6);
    		
    	}
    
    	super.update();
    }

    interact()
    {
    	if(this.dialogLevel == 2 && this.dialingText == "")
        {
            this.help.destructor();
            this.help = null;
        	this.dialingText = null;
    		this.texts = null;
    		
        	this.interact = SimpleFollowingNPC.prototype.interact.bind(this)
        	this.update = SimpleFollowingNPC.prototype.update.bind(this);

            States.getState("game").maxZombie = 20;
        	
        	this.interact();
        }
        else if(this.dialogLevel == 1 && player.killCount >= 6)
        {
        	this.dialogLevel++;
        	
        	this.dialingText = "<center><big>Garcio : Merci Soldat.</big></center>";
        	this.texts = ["<center><big>Soldat : Monsieur j'ai besoin de votre aide pour progresser dans le batiment, toute les portes sont fermés.</big></center>",
        				  "<center><big>Garcio : Je suis le directeur du département je possède toute les clés. Je crois que certains de mes collegues sont encore dans leurs salle venez quand vous aurez récupéré votre arme. Je vous accompagner pour les aider.</big></center>",
        				  "<center><big>Soldat : Merci, allons y.</big></center>",
        				  ""];
        	
        }
        else if(this.dialogLevel == 0 && this.dialingText == "" && !this.spawned)
        {
        	this.spawned = true;
        	player.killCount = 0;
        	this.dialogLevel++;
        }
        

        super.interact();
    }
}
