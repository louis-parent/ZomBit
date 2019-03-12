class Player extends TexturedEntity
{
	constructor(x = 0, y = 0, width = 0, height = 0, image = "", visible = true, depth = 1)
	{
		super(x, y, width, height, image, visible, depth);

		this.speedX = 0;
		this.speedY = 0;

		this.speedValue = 10;

		this.lastSide = 1;
		this.shooting = false;

		this.shooted = new Array();
		
		this.addEventListener("keydown", this.playerMove);
		this.addEventListener("keyup", this.playerStop);
		this.addEventListener("keydown", this.shoot);
	}

	isMoving()
	{
		return this.speedX != 0 || this.speedY != 0;
	}

	update()
	{
		if(this.isMoving())
		{
			let layer = Layers.getLayer("collision");

			let xPercent = ((this.getX() + this.getWidth() / 2) + this.speedX) / layer.layer.width;
			let yPercent = ((this.getY() + this.getHeight()) + this.speedY) / layer.layer.height;

			if(!this.collideWithLayer("collision", xPercent * bgWidth , yPercent * bgHeight))
			{
				this.move(this.speedX, this.speedY);
			}
		}

		for(let i = 0; i < this.shooted.length; i++)
		{
			this.shooted[i].update();
		}
	}
	
	stopAnimation()
	{
		super.stopAnimation();
		this.shooting = false;
	}

	playOnce(target = this, imageArray, frameDelay, currentFrame, midActionIndex, midAction, endAction)
	{
		if(currentFrame == imageArray.length)
		{
			endAction(target);
		}
		else
		{
			if(midActionIndex == currentFrame)
			{
				midAction(target);
			}

			target.setSprite(imageArray[currentFrame]);
			this.currentAnimator = setTimeout(target.playOnce, frameDelay, target, imageArray, frameDelay, currentFrame+1, midActionIndex, midAction, endAction);
		}
	}
	
	playerMove(e)
	{
		if(!this.isMoving())
		{
			if(e.code == "ArrowLeft")
			{
				this.speedX = -this.speedValue;
				this.speedY = 0;
				this.stopAnimation();
				this.animate(["assets/entities/player/walk/left/player_left_walk_1.png", "assets/entities/player/walk/left/player_left_walk_2.png", "assets/entities/player/walk/left/player_left_walk_3.png", "assets/entities/player/walk/left/player_left_walk_4.png", "assets/entities/player/walk/left/player_left_walk_5.png", "assets/entities/player/walk/left/player_left_walk_6.png"], 150);
				player.lastSide = -1;
			}
			else if(e.code == "ArrowRight")
			{
				this.speedX = this.speedValue;
				this.speedY = 0;
				this.stopAnimation();
				this.animate(["assets/entities/player/walk/right/player_right_walk_1.png", "assets/entities/player/walk/right/player_right_walk_2.png", "assets/entities/player/walk/right/player_right_walk_3.png", "assets/entities/player/walk/right/player_right_walk_4.png", "assets/entities/player/walk/right/player_right_walk_5.png", "assets/entities/player/walk/right/player_right_walk_6.png"], 150);
				player.lastSide = 1;
			}

			if(e.code == "ArrowUp")
			{
				this.speedY = -this.speedValue;
				this.speedX = 0;

				if(this.lastSide == -1)
				{
					this.animate(["assets/entities/player/walk/left/player_left_walk_1.png", "assets/entities/player/walk/left/player_left_walk_2.png", "assets/entities/player/walk/left/player_left_walk_3.png", "assets/entities/player/walk/left/player_left_walk_4.png", "assets/entities/player/walk/left/player_left_walk_5.png", "assets/entities/player/walk/left/player_left_walk_6.png"], 150);
				}
				else
				{
					this.animate(["assets/entities/player/walk/right/player_right_walk_1.png", "assets/entities/player/walk/right/player_right_walk_2.png", "assets/entities/player/walk/right/player_right_walk_3.png", "assets/entities/player/walk/right/player_right_walk_4.png", "assets/entities/player/walk/right/player_right_walk_5.png", "assets/entities/player/walk/right/player_right_walk_6.png"], 150);
				}
			}
			else if(e.code == "ArrowDown")
			{
				this.speedY = this.speedValue;
				this.speedX = 0;

				if(this.lastSide == -1)
				{
					this.animate(["assets/entities/player/walk/left/player_left_walk_1.png", "assets/entities/player/walk/left/player_left_walk_2.png", "assets/entities/player/walk/left/player_left_walk_3.png", "assets/entities/player/walk/left/player_left_walk_4.png", "assets/entities/player/walk/left/player_left_walk_5.png", "assets/entities/player/walk/left/player_left_walk_6.png"], 150);
				}
				else
				{
					this.animate(["assets/entities/player/walk/right/player_right_walk_1.png", "assets/entities/player/walk/right/player_right_walk_2.png", "assets/entities/player/walk/right/player_right_walk_3.png", "assets/entities/player/walk/right/player_right_walk_4.png", "assets/entities/player/walk/right/player_right_walk_5.png", "assets/entities/player/walk/right/player_right_walk_6.png"], 150);
				}
			}
		}
	}

	playerStop()
	{
		if(this.isMoving())
		{
			if(this.speedX < 0)
			{
				this.speedX = 0;
				this.stopAnimation();
				this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
				this.lastSide = -1;
			}
			else if(this.speedX > 0)
			{
				this.speedX = 0;
				this.stopAnimation();
				this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
				this.lastSide = 1;
			}
			else if(this.speedY < 0)
			{
				this.speedY = 0;
				this.stopAnimation();

				if(this.lastSide == -1)
				{
					this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
				}
				else
				{
					this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
				}
			}
			else if(this.speedY > 0)
			{
				this.speedY = 0;
				this.stopAnimation();

				if(this.lastSide == -1)
				{
					this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
				}
				else
				{
					this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
				}
			}
		}
	}

	shoot(e)
	{
		if(e.key == " " && !this.shooting)
		{
			this.stopAnimation();
			this.animating = true;
			this.shooting = true;

			this.speedX = 0;
			this.speedY = 0;

			let arr;
			if(this.lastSide == -1)
			{
				arr = ["assets/entities/player/shoot/left/player_left_shoot_1.png", "assets/entities/player/shoot/left/player_left_shoot_2.png", "assets/entities/player/shoot/left/player_left_shoot_3.png", "assets/entities/player/shoot/left/player_left_shoot_4.png"];
			}
			else
			{
				arr = ["assets/entities/player/shoot/right/player_right_shoot_1.png", "assets/entities/player/shoot/right/player_right_shoot_2.png", "assets/entities/player/shoot/right/player_right_shoot_3.png", "assets/entities/player/shoot/right/player_right_shoot_4.png"];
			}

			this.playOnce(this, arr, 50, 0, 3, function(t){
				t.shooted.push(new Bullet(t));
			}, function(t){
				if(t.shooting)
				{
					t.stopAnimation();
					t.shooting = false;

					if(t.lastSide == -1)
					{
						t.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
					}
					else
					{
						t.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
					}
				}
			});
		}
	}
}
