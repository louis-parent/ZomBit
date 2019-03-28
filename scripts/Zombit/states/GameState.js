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

		/* Music */
		SoundEngine.loadSound("game", "assets/audio/music/game.wav");
		SoundEngine.setSoundVolume("game", 15);
		SoundEngine.loopSound("game");

		this.finishInit();
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
		let back = Layers.createLayer("background", "assets/layers/background.png", false, true, 0);
		back.scaleWidth(scale);

		let collision = Layers.createLayer("collision", "assets/layers/collision.png", false, false);
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
