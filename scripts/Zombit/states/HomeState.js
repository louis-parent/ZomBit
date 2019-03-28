class HomeState extends BasicState
{
	constructor()
	{
		super("home");
		
		this.logo = null;
		this.playButton = null;
		this.creditButton = null;
		this.exitButton = null;
	}

	init()
	{
		let back = Layers.createLayer("home", "assets/layers/home.png", true, true, -1);

		this.logo = new TexturedEntity(this, Game.getGameWidth() * 0.165, 0, Game.getGameWidth() * 0.66, Game.getGameWidth() * 0.66 * 0.18718663, "assets/zombit.png");

		/* Music */
		SoundEngine.loadSound("hub", "assets/audio/music/hub.mp3");
		SoundEngine.setSoundVolume("hub", 15);
		SoundEngine.loopSound("hub");

		this.playButton = new Button("assets/entities/button/play/play_button_released.png", "assets/entities/button/play/play_button_pressed.png", this, null, Game.getGameWidth() * 0.375, Game.getGameHeight() * 0.30, Game.getGameWidth() * 0.25, Game.getGameWidth() * 0.25 * 0.18718663);
		this.playButton.action = function(){
			States.goToState("intro");
			sounds.hub.pause();
		};

		this.playButton.dom.style.cursor = "pointer";
		
		this.creditButton = new Button("assets/entities/button/credit/credit_button_released.png", "assets/entities/button/credit/credit_button_pressed.png", this, null, Game.getGameWidth() * 0.375, Game.getGameHeight() * 0.50, Game.getGameWidth() * 0.25, Game.getGameWidth() * 0.25 * 0.18718663);
		this.creditButton.action = function(){
			States.goToState("credit");
		};

		this.creditButton.dom.style.cursor = "pointer";

		this.exitButton = new Button("assets/entities/button/quit/quit_button_released.png", "assets/entities/button/quit/quit_button_pressed.png", this, null, Game.getGameWidth() * 0.375, Game.getGameHeight() * 0.70, Game.getGameWidth() * 0.25, Game.getGameWidth() * 0.25 * 0.18718663);

		this.exitButton.dom.style.cursor = "pointer";

		this.finishInit();
	}

	update()
	{

	}

}
