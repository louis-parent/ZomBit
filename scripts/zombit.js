const bgWidth = 2500;
const bgHeight = 2500;

const scale = 500;

function init()
{
	new GameState().init();
	new HomeState().init();
	
	States.startsWith("home");
}

function update()
{
	States.getCurrentState().update();
}

Game.newGame("ZomBit", init, update);
