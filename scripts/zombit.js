var player;
var camera;

const scale = 500;
function init()
{
	let back = Layers.createLayer("background", "assets/map.png", false, true, 0);
	back.scale(scale);
	let collision = Layers.createLayer("collision", "assets/collision.png", false, false);
	collision.scale(scale);

	player = new Player(back.layer.width * 0.16, back.layer.height * 0.77, back.layer.width * 0.008, back.layer.width * 0.008 * 2.33, "assets/hero_right_idle_1.png");

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
