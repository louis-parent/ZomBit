class Garcio extends MultiDialingNPC
{
    constructor(owningState)
    {
    	let toSay =["<center><big><b><i>Garcio</i></b> : <b>SAUVEZ MOI</b> ILS NE ME LACHENT PAS</big></center>", 
    				"<center><big><b><i>Soldat</i></b> : Je suis la monsieur.</big></center>",
    				"<center><big><b><i>Garcio</i></b> : Ils vont bientôt rentrer vite !</big></center>"];
    				
        super(owningState, toSay, "Garcio", "assets/entities/npc/garcio/garcio.png", Layers.getLayer("background").getWidth()*0.35, Layers.getLayer("background").getHeight()*0.8, player.getWidth()*1.1, player.getWidth() * 1.1 * 1.3);

        this.spawned = false;
        this.dialogLevel = 0;
    }

    interact()
    {
        if(this.dialingText == "" && !this.spawned)
        {
        	this.spawned = true;
        	player.killCount = 0;
        	
            let center = Layers.getLayer("background").getWidth()*0.3;
            let range = Layers.getLayer("background").getWidth()*0.1;
            
            for(let i = 0; i < 6; i++)
            {
                let x = Math.random() * ((center + range) - (center - range)) + (center - range);
                zombies.push(new Zombie(this.getState(), x, Layers.getLayer("background").getHeight()*0.74));
            }
        }
        
        if(this.dialogLevel == 0 && player.killCount >= 6)
        {
        	this.dialogLevel++;
        	
        	this.dialingText = "<center><big><b><i>Garcio</i></b> : merci <i>Soldat</i>.</big></center>";
        	this.texts = ["<center><big><b><i>Soldat</i></b> : Monsieur j'ai besoin de votre aide mon arme est bloqué dans la salle au fond du couloir vous sauriez ou trouver les clés</big></center>",
        				  "<center><big><b><i>Garcio</i></b> : Je suis le <b>directeur du département</b> tenez voila <b>la clé</b>. je crois que certains de mes collegues sont encore dans leurs salle venez quand vous aurez récupéré votre arme. je vous conduirez a eux pour les aider.</big></center>",
        				  "<center><big><b><i>Soldat</i></b> : Merci j'y vais, vous, <b>restez la</b> en m'attendant</big></center>",
        				  ""];
        	
        }

        super.interact();
    }
}
