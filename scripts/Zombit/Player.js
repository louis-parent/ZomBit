class Player extends TexturedEntity
{
	constructor(x = 0, y = 0, width = 0, height = 0, image = "", visible = true, depth = 1)
	{
		super(x, y, width, height, image, visible, depth);

		this.speedX = 0;
		this.speedY = 0;
		
		this.speedValue = 10;
	}

	isMoving()
	{
		return this.speedX != 0 || this.speedY != 0;
	}
	
	update()
	{
		if(this.isMoving())
		{
			if(Layers.getLayer("collision").getPixel(Math.floor(this.x + this.width + this.speedX), Math.floor(this.y + (this.height / 2) + this.speedY))[3] != 255)
			{
				this.move(this.speedX, this.speedY);
			}
		}
	}
}

function playerMove(e)
{
	if(!player.isMoving())
	{
		if(e.code == "ArrowLeft")
		{
			player.speedX = -player.speedValue;
			player.speedY = 0;
			player.setSprite("assets/hero_left_idle_1.png");
		}
		else if(e.code == "ArrowRight")
		{
			player.speedX = player.speedValue;
			player.speedY = 0;
			player.setSprite("assets/hero_right_idle_1.png");
		}

		if(e.code == "ArrowUp")
		{
			player.speedY = -player.speedValue;
			player.speedX = 0;
		}
		else if(e.code == "ArrowDown")
		{
			player.speedY = player.speedValue;
			player.speedX = 0;
		}
	}
}
	
function playerStop()
{
	if(player.isMoving())
	{
		if(player.speedX < 0)
		{
			player.speedX = 0;
			player.setSprite("assets/hero_left_idle_1.png");
		}
		else if(player.speedX > 0)
		{
			player.speedX = 0;
			player.setSprite("assets/hero_right_idle_1.png");
		}
		else if(player.speedY < 0)
		{
			player.speedY = 0;
		}
		else if(player.speedY > 0)
		{
			player.speedY = 0;
		}
	}
}
