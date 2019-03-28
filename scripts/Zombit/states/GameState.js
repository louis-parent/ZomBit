var player;
var zombies = new Array();

var currentDialog = null;

class GameState extends BasicState
{
	constructor()
	{
		super("game");

		this.camera = null;
		this.garcio = null;
		this.jhon = null;
		this.micloch = null;
		
		this.glasses = null;
		this.postit = null;

		this.maxZombie = 0;
		this.spawnProbability = 10;

		this.startingDialogs = new Array();
	}

	init()
	{
		this.createLayers();
		this.createEntities();
		this.loadDialogs();

		this.addEventListener("keydown", function(e){
			if(e.key == "Escape")
			{
				States.goToState("pause");
			}
		});
		
		/* Debug & Cheats */
		this.addEventListener("keydown", function(e){
			if(e.ctrlKey && e.altKey){
				this.debug(e.key);
				e.preventDefault();
			}
		});

		/* Music */
		SoundEngine.loadSound("game", "assets/audio/music/game.wav");
		SoundEngine.setSoundVolume("game", 15);
		SoundEngine.loopSound("game");

		this.finishInit();
	}
	
	debug(key)
	{
		switch(key)
		{
			// Player pos debug
			case "b":
				let layer = Layers.getLayer("collision");
				console.log("x(%) : " + player.getX()/layer.getWidth() + ", y(%) :  " + player.getY()/layer.getHeight());
				break;
			
			// Heal player
			case "h":
				player.health = 6;
				break;
				
			// Kill Zombie
			case "k":
				zombies.forEach(function(e){e.destructor(); player.killCount++;});
				zombies = new Array();
				break;
			
			//Skip Garcio
			case "g":
				this.garcio.dialogLevel = 2;
				this.garcio.dialingText = "";
				this.garcio.interact();
				this.garcio.setX(player.getX());
				this.garcio.setY(player.getY());
				break;
				
			// Skip Jhon
			case "j":
				this.garcio.setX(Layers.getLayer("background").getWidth() * 0.81);
				this.garcio.setY(Layers.getLayer("background").getHeight() * 0.32);
				this.garcio.following = null;
				this.garcio.interact = function(){};
				
				this.jhon.dialogLevel = 3;
				this.jhon.dialingText = "";
				this.jhon.interact();
				this.jhon.setX(player.getX());
				this.jhon.setY(player.getY());
				break;
		}
	}

	update()
	{
		if(currentDialog == null && this.startingDialogs.length > 0)
		{
			currentDialog = new DialogBox(this, this.startingDialogs.splice(0, 1), "assets/hud/background.png", Game.getGameHeight() * 0.33 * 0.15);
		}
		player.update();
		this.camera.update();

		if(player.isDead())
			{
				States.goToState("death");
			}

		if(currentDialog == null){

			this.garcio.update();
			this.jhon.update();
			this.micloch.update();
		
			if(this.glasses != null) { this.glasses.update(); }
			if(this.postit != null) { this.postit.update(); }
			
			zombies.forEach(function(elem){
				elem.update();
			});


			if(Math.floor(Math.random() * 100) < this.spawnProbability && zombies.length < this.maxZombie){
				Zombie.spawningZombie();
				this.maxZombie--;
			}
			
		}else{
			currentDialog.update();
		}
	}

	reset()
	{
		player.destructor();
		for(let i = 0; i < zombies.length; i++)
		{
			zombies[i].destructor();
		}
		
		this.garcio.destructor();
		this.jhon.destructor();
		this.micloch.destructor();
		
		this.glasses.destructor();
		this.postit.destructor();
		
		this.camera = null;
		
		Layers.removeLayer("background");
		Layers.removeLayer("collision");
		Layers.removeLayer("spawn");
		Layers.removeLayer("foreground");
		
		this.createLayers();
		this.createEntities();
		this.loadDialogs();
	}
	
	createLayers()
	{
		let back = Layers.createLayer("background", "assets/layers/background_1.png", false, true, 0);
		back.scaleWidth(scale);

		let collision = Layers.createLayer("collision", "assets/layers/collision_1.png", false, false);
		collision.scaleWidth(scale);
		
		let bulletCollision = Layers.createLayer("bullet-collision", "assets/layers/bullet_collision.png", false, false);
		bulletCollision.scaleWidth(scale);

		let foreground = Layers.createLayer("foreground", "assets/layers/foreground.png", false, true, 5000);
		foreground.scaleWidth(scale);
	}

	createEntities()
	{
		zombies = new Array();
		player = new Player(this);
		this.camera = new FixedCamera(player);

		this.garcio = new Garcio(this);
		this.jhon = new JhonAnnides(this);
		this.micloch = new MiclochMalnor(this);
		
		this.glasses = new Glasses(this);
		this.postit = new PostIt(this);
	}
	
	loadDialogs()
	{
		this.startingDialogs = new Array();
		this.startingDialogs.push("<center><big>Agent de liaison: Soldat!! Soldat êtes vous là ?</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Nous avons perdu le contact avec le reste de votre escouade !</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: La mission doit continuer mais votre spécialiste réseau est mort, trouvez un moyen de gérer ça soldat !</big></center>");
		this.startingDialogs.push("<center><big>Soldat: Mais enfin comment voulez vous que j'y arrive ?</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Je resterai en contact avec vous tout au long de votre mission !</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Nous avons eu vent de quelque professeur qui aurai reussi a se barricader dans leurs salles de cours !</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Ils devraient pouvoir vous aider. Cherchez les !</big></center>");
	}
}
