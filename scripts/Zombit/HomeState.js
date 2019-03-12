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
		logo = new TexturedEntity(this, 0, 0, 1795, 336, "assets/zombit.png");
		
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
