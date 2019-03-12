var logo;
var playButton;
var exitButton;

class HomeState extends BasicState
{
	constructor()
	{
		super("home");	
	}
	
	init()
	{
		let back = Layers.createLayer("background", "assets/layers/home.png", true, true, -1);
		
		logo = new TexturedEntity(this, Game.getGameWidth() * 0.165, 0, Game.getGameWidth() * 0.66, Game.getGameWidth() * 0.66 * 0.18718663, "assets/zombit.png");
		
		playButton = new TexturedEntity(this, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.33, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663, "assets/entities/button/play/play_button_released.png");
		exitButton = new TexturedEntity(this, Game.getGameWidth() * 0.33, Game.getGameHeight() * 0.66, Game.getGameWidth() * 0.33, Game.getGameWidth() * 0.33 * 0.18718663, "assets/entities/button/quit/quit_button_released.png");
		
		this.addEventListener("keydown", function(e){
			if(e.key == "Enter")
			{
				States.goToState("game");
			}
		});
		
		this.finishInit();
	}
	
	update()
	{
		
	}
}
