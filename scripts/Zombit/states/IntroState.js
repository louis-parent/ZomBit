class IntroState extends BasicState
{
	constructor()
	{
		super("intro");
		
		this.introText = null;
		this.continueButton = null;
		
		this.i = 0;
		this.frames = 45 * 60;//45s * 60fps
	}

	init()
	{
		let back = Layers.createLayer("intro", "assets/layers/text.png", true, true, -1);
		
		let text = "<big>Depuis quelques heures, le monde est en proie aux flammes et au chaos.<br/>Un virus a été accidentellement répandu par un hacker trop jeune pour accéder au système informatique du laboratoire Zontic. Ce virus a eu pour effet de transformer 70% de la population environnante en bêtes dont l'humanité n'est plus, affamée de chair humaine.<br/><br/>Vous devez rendre au monde son état normal.<br/>Pour cela vous devez vous introduire dans un bâtiment scolaire dont le réseau est relié au laboratoire. De là vous pourrez hacker le labo et répandre le vaccin de l'antivirus qui rendra aux personnes infectés leur état normal.<br/><br/>ATENTION vous ne devez montrer aucune pitié envers ces monstres car ils n'en auront pas avec vous trouvez un moyen de réparer les conneries de ce gosse et vous aurez sauvé le monde...</big>";
		
		this.introText = new Label(this, text, Game.getGameWidth() * 0.2, Game.getGameHeight() * 0.2, Game.getGameWidth() - (Game.getGameWidth() * 0.4), Game.getGameHeight() - (Game.getGameHeight() * 0.4));
		
		this.continueButton = new Button("assets/entities/button/enter/enter_button.png", "assets/entities/button/enter/enter_button.png", this, null, this.introText.getX() + (this.introText.getWidth() - this.introText.getWidth() * 0.1), this.introText.getY() + this.introText.getHeight(), this.introText.getWidth() * 0.1, this.introText.getWidth() * 0.1);
		this.continueButton.action = function(){
			this.goToGame();
		}.bind(this);

		this.continueButton.dom.style.cursor = "pointer";

		this.addEventListener("keydown", function(e){ if(e.key == "Enter"){ this.goToGame(); }});

		this.finishInit();
	}

	update()
	{
		if(this.i == this.frames)
		{
			this.goToGame();
		}
		else
		{
			this.i++;
		}
	}
	
	goToGame()
	{
		States.goToState("game");
		States.resetState("game");
	}
}
