class CreditState extends BasicState
{
	constructor()
	{
		super("credit");
		
		this.backButton = null;
	}

	init()
	{
		let back = Layers.createLayer("creditBack", "assets/layers/home.png", true, true, -1);
		let cred = Layers.createLayer("credit", "assets/layers/credit.png", true, true, 0);
		
		this.backButton = new Button("assets/entities/button/return/return_button.png", "assets/entities/button/return/return_button.png", this, null, 0, 0, (Game.getGameWidth() * 0.130208333) *0.75, (Game.getGameHeight() * 0.231481481) * 0.75);
		this.backButton.action = function(){
			States.goToState("home");
		};

		this.backButton.dom.style.cursor = "pointer";

		this.finishInit();
	}

	update()
	{

	}
}
