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

	}

	hit(damage = 1)
	{

	}

	isDead()
	{
		return this.health <= 0;
	}

	getHealth()
	{
		return this.health;
	}

	update()
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

	stopAnimation()
	{
		super.stopAnimation();
		this.shooting = false;
	}

	playerMove(e)
	{
		let newMovement = false;
		switch(e.code){
			case "ArrowLeft":
				newMovement = (this.speedX != - this.speedValue);
				this.speedX = - this.speedValue;
				break;
			case "ArrowRight":
				newMovement = (this.speedX != this.speedValue);
				this.speedX = this.speedValue;
				break;
			case "ArrowUp":
				newMovement = (this.speedY != - this.speedValue);
				this.speedY = - this.speedValue;
				break;
			case "ArrowDown":
				newMovement = (this.speedY != this.speedValue);
				this.speedY = this.speedValue;
				break;
		}

		if(newMovement){
			if(this.speedX == 0){
				if(this.speedY < 0){ // Up
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/up/player_up_walk_1.png", "assets/entities/player/walk/up/player_up_walk_2.png", "assets/entities/player/walk/up/player_up_walk_3.png", "assets/entities/player/walk/up/player_up_walk_4.png", "assets/entities/player/walk/up/player_up_walk_5.png", "assets/entities/player/walk/up/player_up_walk_6.png"], 150);
				}else if(this.speedY > 0){ // Down
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/down/player_down_walk_1.png", "assets/entities/player/walk/down/player_down_walk_2.png", "assets/entities/player/walk/down/player_down_walk_3.png", "assets/entities/player/walk/down/player_down_walk_4.png", "assets/entities/player/walk/down/player_down_walk_5.png", "assets/entities/player/walk/down/player_down_walk_6.png"], 150);
				}
			}else{
				if(this.speedX < 0){ // Left
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/left/player_left_walk_1.png", "assets/entities/player/walk/left/player_left_walk_2.png", "assets/entities/player/walk/left/player_left_walk_3.png", "assets/entities/player/walk/left/player_left_walk_4.png", "assets/entities/player/walk/left/player_left_walk_5.png", "assets/entities/player/walk/left/player_left_walk_6.png"], 150);
				}else{ // Right
					this.stopAnimation();
					this.animate(["assets/entities/player/walk/right/player_right_walk_1.png", "assets/entities/player/walk/right/player_right_walk_2.png", "assets/entities/player/walk/right/player_right_walk_3.png", "assets/entities/player/walk/right/player_right_walk_4.png", "assets/entities/player/walk/right/player_right_walk_5.png", "assets/entities/player/walk/right/player_right_walk_6.png"], 150);

				}
			}
		}
	}

	playerStop(e)
	{
		let previousDirection = RIGHT;
		switch(e.code){
			case "ArrowLeft":
				if(this.speedX < 0){
					this.speedX = 0;
					previousDirection = LEFT;
				}
				break;
			case "ArrowRight":
				if(this.speedX > 0){
					this.speedX = 0;
					previousDirection = RIGHT;
				}
				break;
			case "ArrowUp":
				if(this.speedY < 0){
					this.speedY = 0;
					previousDirection = UP;
				}
				break;
			case "ArrowDown":
				if(this.speedY > 0){
					this.speedY = 0;
					previousDirection = DOWN;
				}
				break;
		}

		
		
		if(this.speedX == 0 && this.speedY == 0){
			switch(previousDirection){
				case UP:
					this.stopAnimation();
					this.setSprite("assets/entities/player/walk/up/player_up_walk_1.png");
					break;
				case DOWN:
					this.stopAnimation();
					this.setSprite("assets/entities/player/walk/down/player_down_walk_1.png");
					break;
				case LEFT:
					this.stopAnimation();
					this.setSprite("assets/entities/player/idle/left/player_left_idle.gif");
					break;
				case RIGHT:
					this.stopAnimation();
					this.setSprite("assets/entities/player/idle/right/player_right_idle.gif");
					break;
			}
		}

	}

	shoot(e)
	{

	}
}
