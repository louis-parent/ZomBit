class DeathState extends BasicState
{
	constructor()
	{
		super("death");
			
		this.deadText = null;
		this.homeButton = null;
	}

	init()
	{
		
		let back = Layers.createLayer("background", "assets/layers/home.png", true, true, -1);

		this.deadText = new TexturedEntity(this, Game.getGameWidth() * 0.165, 0, Game.getGameWidth() * 0.66, Game.getGameWidth() * 0.66 * 0.18718663, "assets/entities/text/dead.png");

		this.homeButton = new Button("assets/entities/button/home/home_button_released.png", "assets/entities/button/home/home_button_pressed.png", this, null, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.50 - (Game.getGameWidth() * 0.33 * 0.18718663 / 2), Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663);
		this.homeButton.action = function(){
			States.goToState("home");
		};

		this.finishInit();
	}

	update()
	{

	}
}
