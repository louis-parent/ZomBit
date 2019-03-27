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

		this.finishInit();
	}

	update()
	{
		if(currentDialog == null && this.startingDialogs.length > 0)
		{
			currentDialog = new DialogBox(this, this.startingDialogs.splice(0, 1), "assets/hud/background.png", Game.getGameHeight() * 0.33 * 0.15);
		}

		zombies.forEach(function(elem){
			elem.update();
		});
		player.update();
		this.camera.update();

		if(player.isDead())
		{
			States.goToState("death");
		}

		this.garcio.update();
		this.jhon.update();

		if(currentDialog != null)
		{
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

		let spawn = Layers.createLayer("spawn", "assets/layers/spawn.png", false, false);
		spawn.scaleWidth(scale);

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
	}
	
	loadDialogs()
	{
		this.startingDialogs = new Array();
		this.startingDialogs.push("<center><big><b><i>Agent de liaison</i></b>: </i>Soldat!!</i> <i>Soldat</i> êtes vous là ?</big></center>");
		this.startingDialogs.push("<center><big><b><i>Agent de liaison</i></b>: Nous avons perdu le contact avec le reste de votre escouade !</big></center>");
		this.startingDialogs.push("<center><big><b><i>Agent de liaison</i></b>: La <b>mission</b> doit continuer mais votre spécialiste réseau est mort, trouvez un moyen de gérer ça <i>soldat</i> !</big></center>");
		this.startingDialogs.push("<center><big><b><i>Soldat</i></b>: Mais enfin comment voulez vous que j'y arrive ?</big></center>");
		this.startingDialogs.push("<center><big><b><i>Agent de liaison</i></b>: <b>Je resterai en contact</b> avec vous tout au long de votre mission !</big></center>");
		this.startingDialogs.push("<center><big><b><i>Agent de liaison</i></b>: Nous avons eu vent de <b>quelque professeur</b> qui aurai reussi a se barricader dans leurs <b>salles de cours</b> !</big></center>");
		this.startingDialogs.push("<center><big><b><i>Agent de liaison</i></b>: Ils devraient pouvoir vous <b>aider</b>. <b>Cherchez les !</b></big></center>");
	}
}
