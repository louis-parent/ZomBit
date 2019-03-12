const bgWidth = 1984;
const bgHeight = 1984;
var player;
var camera;

const scale = 500;
function init()
{
	let back = Layers.createLayer("background", "assets/layers/map.png", false, true, 0);
	back.scale(scale);
	let collision = Layers.createLayer("collision", "assets/layers/collision.png", false, false);
	collision.scale(scale);

	player = new Player(back.layer.width * 0.16, back.layer.height * 0.8, back.layer.width * 0.008, back.layer.width * 0.008 * 1.391304348, "assets/entities/player/idle/right/player_right_idle.gif");

	player.addEventListener("keydown", playerMove);
	player.addEventListener("keyup", playerStop);
	player.addEventListener("keydown", shoot);

	camera = new FixedCamera(player);
}

function update()
{
	player.update();
	camera.update();
}

Game.newGame("ZomBit", init, update);
