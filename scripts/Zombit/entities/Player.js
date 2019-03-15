const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

class Player extends TexturedEntity
{
	constructor(owningState)
	{
		super(owningState, Layers.getLayer("background").layer.width * 0.15, Layers.getLayer("background").layer.height * 0.7, Layers.getLayer("background").layer.width * 0.008, Layers.getLayer("background").layer.width * 0.008 * 1.391304348, "assets/entities/player/idle/right/player_right_idle.gif");
1
		this.speedX = 0;
		this.speedY = 0;

		this.speedValue = 10;

		this.direction = RIGHT;
		this.oldDirection = this.direction;
		this.directionArray = [];
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
		console.log(this.directionArray);
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
		}

		this.healthBar.setX((this.getX() + (this.getWidth() / 2)) - (Game.getGameWidth() / 2) + (Game.getGameWidth() * 0.01));
		this.healthBar.setY((this.getY() + (this.getHeight() / 2)) - (Game.getGameHeight() / 2) + (Game.getGameHeight() * 0.01));

		for(let i = 0; i < this.shooted.length; i++)
		{
			this.shooted[i].update();
		}

		this.oldDirection = this.direction;
	}

	removeDirection(dir){
		for(var i = 0; i < this.directionArray.length; i++){
			if(this.directionArray[i] == dir){
				this.directionArray.splice(i,1);
			}
		}
	}

	isMovingInDirection(dir){
		for(var i = 0; i < this.directionArray.length; i++){
			if(this.directionArray[i] == dir){
				return true;
			}
		}
		return false;
	}

	stopAnimation()
	{
		super.stopAnimation();
		this.shooting = false;
	}

	playerMove(e)
	{
		var stopped = (this.directionArray.length == 0);
			if(e.code == "ArrowLeft" && !this.isMovingInDirection(LEFT))
			{
				console.log("LEFT");
				this.directionArray.push(LEFT);
				this.direction = LEFT;
				this.removeDirection(RIGHT);
			}
			else if(e.code == "ArrowRight" && !this.isMovingInDirection(RIGHT))
			{
				console.log("RIGHT");
				this.directionArray.push(RIGHT);
				this.direction = RIGHT;
				this.removeDirection(LEFT);
			}

			if(e.code == "ArrowUp" && !this.isMovingInDirection(UP))
			{
				console.log("UP");
				this.directionArray.push(UP);
				this.direction = UP;
				this.removeDirection(DOWN);
			}
			else if(e.code == "ArrowDown" && !this.isMovingInDirection(DOWN))
			{
				console.log("DOWN");
				this.directionArray.push(DOWN);
				this.direction = DOWN;
				this.removeDirection(UP);
			}

			this.speedX = this.isMovingInDirection(RIGHT) * this.speedValue + this.isMovingInDirection(LEFT) * -this.speedValue;
			this.speedY = this.isMovingInDirection(DOWN) * this.speedValue + this.isMovingInDirection(UP) * -this.speedValue;

			if(this.oldDirection != this.direction || stopped){
				if(this.speedY < 0){
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/up/player_up_walk_1.png", "assets/entities/player/walk/up/player_up_walk_2.png", "assets/entities/player/walk/up/player_up_walk_3.png", "assets/entities/player/walk/up/player_up_walk_4.png", "assets/entities/player/walk/up/player_up_walk_5.png", "assets/entities/player/walk/up/player_up_walk_6.png"], 150);
				}else if(this.speedY > 0){
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/down/player_down_walk_1.png", "assets/entities/player/walk/down/player_down_walk_2.png", "assets/entities/player/walk/down/player_down_walk_3.png", "assets/entities/player/walk/down/player_down_walk_4.png", "assets/entities/player/walk/down/player_down_walk_5.png", "assets/entities/player/walk/down/player_down_walk_6.png"], 150);
				}

				if(this.speedX > 0){
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/right/player_right_walk_1.png", "assets/entities/player/walk/right/player_right_walk_2.png", "assets/entities/player/walk/right/player_right_walk_3.png", "assets/entities/player/walk/right/player_right_walk_4.png", "assets/entities/player/walk/right/player_right_walk_5.png", "assets/entities/player/walk/right/player_right_walk_6.png"], 150);
				}else if(this.speedX < 0){
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/left/player_left_walk_1.png", "assets/entities/player/walk/left/player_left_walk_2.png", "assets/entities/player/walk/left/player_left_walk_3.png", "assets/entities/player/walk/left/player_left_walk_4.png", "assets/entities/player/walk/left/player_left_walk_5.png", "assets/entities/player/walk/left/player_left_walk_6.png"], 150);
				}
			}

		
	}

	playerStop(e)
	{
		if(this.isMoving())
		{
			if(this.directionArray.length == 1){
				switch(this.directionArray[0]){
					case RIGHT:
						this.stopAnimation();
						this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
						break;
					case LEFT:
						this.stopAnimation();
						this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
						break;
					case UP:
						this.stopAnimation();
						this.setSprite("assets/entities/player/walk/up/player_up_walk_1.png");
						break;
					case DOWN:
						this.stopAnimation();
						this.setSprite("assets/entities/player/walk/down/player_down_walk_1.png");		
						break;
				}
				this.direction = this.directionArray[0];
			}

			if(e.code == "ArrowLeft"){
				this.speedX = 0;
				this.removeDirection(LEFT);
			}
			else if(e.code == "ArrowRight"){
				this.speedX = 0;
				this.removeDirection(RIGHT);
			}
			else if(e.code == "ArrowUp"){
				this.speedY = 0;
				this.removeDirection(UP);
			}
			else if(e.code == "ArrowDown"){
				this.speedY = 0;
				this.removeDirection(DOWN);
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
			switch(this.direction)
			{
				case RIGHT:
					arr = ["assets/entities/player/shoot/right/player_right_shoot_1.png", "assets/entities/player/shoot/right/player_right_shoot_2.png", "assets/entities/player/shoot/right/player_right_shoot_3.png", "assets/entities/player/shoot/right/player_right_shoot_4.png"];
					break;
					
				case LEFT:
					arr = ["assets/entities/player/shoot/left/player_left_shoot_1.png", "assets/entities/player/shoot/left/player_left_shoot_2.png", "assets/entities/player/shoot/left/player_left_shoot_3.png", "assets/entities/player/shoot/left/player_left_shoot_4.png"];
					break;
					
				case DOWN:
					arr = ["assets/entities/player/walk/down/player_down_walk_1.png", "assets/entities/player/walk/down/player_down_walk_1.png", "assets/entities/player/walk/down/player_down_walk_1.png", "assets/entities/player/walk/down/player_down_walk_1.png"];
					break;
					
				case UP:
					arr = ["assets/entities/player/walk/up/player_up_walk_1.png", "assets/entities/player/walk/up/player_up_walk_1.png", "assets/entities/player/walk/up/player_up_walk_1.png", "assets/entities/player/walk/up/player_up_walk_1.png"];
					break;
			}

			this.animateOnce(arr, 50, 3, function(){
				this.shooted.push(new Bullet(this));
			}, function(){
				if(this.shooting)
				{
					this.stopAnimation();
					this.shooting = false;

					switch(this.direction)
					{
						case RIGHT:
							this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
							break;
							
						case LEFT:
							this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
							break;
							
						case DOWN:
							this.setSprite("assets/entities/player/walk/down/player_down_walk_1.png");
							break;
							
						case UP:
							this.setSprite("assets/entities/player/walk/up/player_up_walk_1.png");
							break;
					}
				}
			});
		}
	}
}
