class Player extends TexturedEntity
{
	constructor(owningState, x = 0, y = 0, width = 0, height = 0, image = "", visible = true, depth = 1)
	{
		super(owningState, x, y, width, height, image, visible, depth);
1
		this.speedX = 0;
		this.speedY = 0;

		this.speedValue = 10;

		this.lastSide = 1;
		this.shooting = false;

		this.shooted = new Array();

		this.health = 6;

		this.invincible = false;
		this.invincibilityFrame = 60;
		this.curentInvincibilityFrame = 0;

		let healthBarX = (this.getX() + (this.getWidth() / 2)) - (Game.getGameWidth() / 2) + (Game.getGameWidth() * 0.01);
		let healthBarY = (this.getY() + (this.getHeight() / 2)) - (Game.getGameHeight() / 2) + (Game.getGameHeight() * 0.01);

		this.healthBar = new TexturedEntity(owningState, healthBarX, healthBarY, Game.getGameWidth() * 0.075, Game.getGameWidth() * 0.075 * 0.285714286, "assets/entities/life_bar/life_bar_6.png", true, 10000);

		this.addEventListener("keydown", this.playerMove);
		this.addEventListener("keyup", this.playerStop);
		this.addEventListener("keydown", this.shoot);
	}

	destructor()
	{
		super.destructor();

		for (let i = 0; i < this.shooted.length; i++)
		{
			this.shooted[i].destructor();
		}

		this.shooted = new Array();

		this.healthBar.destructor();
		this.healthBar = null;
	}

	hit(damage = 1)
	{
		if(!this.invincible)
		{
			this.health -= damage;
			if(this.health < 0)
			{
				this.health = 0;
			}

			this.invincible = true;
			this.curentInvincibilityFrame = 0;
		}
	}

	isDead()
	{
		return this.health <= 0;
	}

	getHealth()
	{
		return this.health;
	}

	isMoving()
	{
		return this.speedX != 0 || this.speedY != 0;
	}

	update()
	{
		this.healthBar.setSprite("assets/entities/life_bar/life_bar_" + this.health + ".png");

		if(this.invincible)
		{
			if(this.curentInvincibilityFrame < this.invincibilityFrame)
			{
				this.curentInvincibilityFrame++;
			}
			else
			{
				this.invincible = false;
			}
		}

		if(this.isMoving())
		{
			let layer = Layers.getLayer("collision");

			let xPercent1 = (this.getX() + this.speedX + 4) / layer.layer.width;
			let xPercent2 = ((this.getX() + this.getWidth() - 4) + this.speedX) / layer.layer.width;
			let yPercent = ((this.getY() + this.getHeight()) + this.speedY) / layer.layer.height;

			if(!this.collideWithLayer("collision", xPercent1 * bgWidth , yPercent * bgHeight) && !this.collideWithLayer("collision", xPercent2 * bgWidth , yPercent * bgHeight))
			{
				this.move(this.speedX, this.speedY);
			}

			this.healthBar.setX((this.getX() + (this.getWidth() / 2)) - (Game.getGameWidth() / 2) + (Game.getGameWidth() * 0.01));
			this.healthBar.setY((this.getY() + (this.getHeight() / 2)) - (Game.getGameHeight() / 2) + (Game.getGameHeight() * 0.01));
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

			this.animateOnce(arr, 50, 3, function(){
				this.shooted.push(new Bullet(this));
			}, function(){
				if(this.shooting)
				{
					this.stopAnimation();
					this.shooting = false;

					if(this.lastSide == -1)
					{
						this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
					}
					else
					{
						this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
					}
				}
			});
		}
	}
}
