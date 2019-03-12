const bgWidth = 1984;
const bgHeight = 1984;

const scale = 500;

function init()
{
	new GameState().init();
	new HomeState().init();
	
	States.startWith("home");
}

function update()
{
	States.getCurrentState().update();
}

Game.newGame("ZomBit", init, update);
