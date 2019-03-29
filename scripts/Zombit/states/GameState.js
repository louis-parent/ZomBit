var questTracker = null;
var player = null;
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
		this.key = null;

		this.postit = null;
		this.computer = null;

		this.maxZombie = 0;
		this.spawnProbability = 10;

		this.startingDialogs = new Array();
	}

	init()
	{
		this.createLayers();
		this.createEntities();
		this.loadDialogs();
		this.loadSounds();

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

				if(this.glasses != null)
				{
					this.glasses.destructor();
					this.glasses = null;
					player.findGlasses = true;
				}

				this.jhon.dialogLevel = 3;
				this.jhon.dialingText = "";
				this.jhon.interact();
				this.jhon.setX(player.getX());
				this.jhon.setY(player.getY());
				break;

			// Skip Micloch
			case "m":
				this.garcio.setX(Layers.getLayer("background").getWidth() * 0.81);
				this.garcio.setY(Layers.getLayer("background").getHeight() * 0.32);
				this.garcio.following = null;
				this.garcio.interact = function(){};

				this.jhon.setX(Layers.getLayer("background").getWidth() * 0.054);
				this.jhon.setY(Layers.getLayer("background").getHeight() * 0.107);
				this.jhon.following = null;
				this.jhon.interact = function(){};

				if(this.glasses != null)
				{
					this.glasses.destructor();
					this.glasses = null;
					player.findGlasses = true;
				}
				
				if(this.postit != null)
				{
					this.postit.destructor();
					this.postit = null;
				}

				if(this.key != null)
				{
					this.key.destructor();
					this.key = null;
					player.findKey = true;
				}

				this.micloch.dialogLevel = 3;
				this.micloch.dialingText = "";
				this.micloch.interact();
				this.micloch.setX(player.getX());
				this.micloch.setY(player.getY());
				break;

			// Speed Boost
			case "f":
				if(player.speedValue == 10)
				{
					player.speedValue = 30;
				}
				else
				{
					player.speedValue = 10;
				}
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
		
		questTracker.update();

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
			if(this.key != null) { this.key.update(); }
			if(this.computer != null) { this.computer.update(); }

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
		this.key.destructor();
		this.computer.destructor();

		this.camera = null;
		
		questTracker.destructor();

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
		
		questTracker = new QuestTracker(this, "Trouver Garcio");

		this.garcio = new Garcio(this);
		this.jhon = new JhonAnnides(this);
		this.micloch = new MiclochMalnor(this);

		this.glasses = new Glasses(this);
		this.postit = new PostIt(this);
		this.key = new Key(this);
		this.computer = new Computer(this);
	}

	loadDialogs()
	{
		this.startingDialogs = new Array();
		this.startingDialogs.push("<center><big>Agent de liaison: Soldat! Soldat êtes-vous là ?</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Nous avons perdu le contact avec le reste de votre escouade !</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: La mission doit continuer mais votre spécialiste réseau est mort, trouvez un moyen de gérer ça soldat !</big></center>");
		this.startingDialogs.push("<center><big>Soldat: Mais enfin comment voulez-vous que j'y arrive ?</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Je resterai en contact avec vous tout au long de votre mission ! Enfin on m'a dit que je devais vous dire ça mais vous entendrai plus jamais parler de moi...</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Nous avons eu vent de quelque professeur qui aurait reussi à se barricader dans leurs salles de cours !</big></center>");
		this.startingDialogs.push("<center><big>Agent de liaison: Ils devraient pouvoir vous aider. Cherchez-les !</big></center>");
	}

	loadSounds()
	{
		/* Music */
		SoundEngine.loadSound("game", "assets/audio/music/game.wav");
		SoundEngine.setSoundVolume("game", 15);
		SoundEngine.loopSound("game");

		/* Sound Effects */
		SoundEngine.loadSound("blaster", "assets/audio/effects/blaster.ogg");
		SoundEngine.setSoundVolume("blaster", 30);
		
		SoundEngine.loadSound("ZD1", "assets/audio/effects/zombieDéplacement1.ogg");
		SoundEngine.setSoundVolume("ZD1", 90);

		SoundEngine.loadSound("ZD2", "assets/audio/effects/zombieDéplacement2.ogg");
		SoundEngine.setSoundVolume("ZD2", 90);

		SoundEngine.loadSound("ZD3", "assets/audio/effects/zombieDéplacement3.ogg");
		SoundEngine.setSoundVolume("ZD3", 90);

		SoundEngine.loadSound("ZM1", "assets/audio/effects/zombieMort1.ogg");
		SoundEngine.setSoundVolume("ZM1", 90);

		SoundEngine.loadSound("ZM2", "assets/audio/effects/zombieMort2.ogg");
		SoundEngine.setSoundVolume("ZM2", 70);

		SoundEngine.loadSound("ZM3", "assets/audio/effects/zombieMort3.ogg");
		SoundEngine.setSoundVolume("ZM3", 100);

		SoundEngine.loadSound("ZM4", "assets/audio/effects/zombieMort4.ogg");
		SoundEngine.setSoundVolume("ZM4", 100);

		SoundEngine.loadSound("ZH1", "assets/audio/effects/zombieAttaque1.ogg");
		SoundEngine.setSoundVolume("ZM1", 50);

		SoundEngine.loadSound("ZH2", "assets/audio/effects/zombieAttaque2.ogg");
		SoundEngine.setSoundVolume("ZM2", 50);
	}
}
