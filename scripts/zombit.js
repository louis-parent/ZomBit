var player;
var camera;

function init()
{
	Layers.createLayer("background", "assets/background_layer.png", false, true, 0);
	Layers.createLayer("collision", "", false, false);
	
	player = new Player(Game.getGameWidth() / 2, Game.getGameHeight() / 2, 144, 336, "assets/hero_right_idle_1.png");
	
	player.addEventListener("keydown", playerMove);
	player.addEventListener("keyup", playerStop);
	
	camera = new FixedCamera(player);
}

function update()
{
	player.update();
	camera.update();
}

Game.newGame("ZomBit", init, update);
