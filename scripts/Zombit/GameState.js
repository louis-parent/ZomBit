var player;
var camera;

var zombies = new Array();

class GameState extends BasicState
{
	constructor()
	{
		super("game");	
	}
	
	init()
	{
		let back = Layers.createLayer("background", "assets/layers/background.png", false, true, 0);
		back.scale(scale);
		
		let collision = Layers.createLayer("collision", "assets/layers/collision.png", false, false);
		collision.scale(scale);
		
		let foreground = Layers.createLayer("foreground", "assets/layers/foreground.png", false, true, 9999);
		foreground.scale(scale);

		player = new Player(this, back.layer.width * 0.16, back.layer.height * 0.7, back.layer.width * 0.008, back.layer.width * 0.008 * 1.391304348, "assets/entities/player/idle/right/player_right_idle.gif");
	
		for(let i = 0; i < 10; i++)
		{
			zombies.push(new Zombie(this));
		}

		camera = new FixedCamera(player);
		
		this.addEventListener("keydown", function(e){
			if(e.key == "Escape")
			{
				States.goToState("home");
			}
		});
		
		this.finishInit();
	}
	
	update()
	{
		zombies.forEach(function(elem){
			elem.update();
		});
		player.update();
		camera.update();
	}
}
