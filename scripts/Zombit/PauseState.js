var pauseText;
var continueButton;
var restartButton;
var homeButton;

class PauseState extends BasicState
{
	constructor()
	{
		super("pause");
	}

	init()
	{
		let back = Layers.createLayer("background", "assets/layers/home.png", true, true, -1);

		pauseText = new TexturedEntity(this, Game.getGameWidth() * 0.33, 0, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663, "assets/zombit.png");

		continueButton = new Button("assets/entities/button/continue/continue_button_released.png", "assets/entities/button/continue/continue_button_pressed.png", this, null, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.25, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663);
		continueButton.action = function(){
			States.goToState("game");
		};

        restartButton = new Button("assets/entities/button/restart/restart_button_released.png", "assets/entities/button/restart/restart_button_pressed.png", this, null, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.50, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663);
        restartButton.action = function(){
            States.goToState("game");
            States.resetState("game");
        };

        homeButton = new Button("assets/entities/button/home/home_button_released.png", "assets/entities/button/home/home_button_pressed.png", this, null, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.75, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663);
		homeButton.action = function(){
			States.goToState("home");
		};

		this.finishInit();
	}

	update()
	{

	}
}
