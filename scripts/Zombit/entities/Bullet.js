class Bullet extends TexturedEntity
{
    constructor(shooter)
    {
        let startX = 0, startY = 0, startW = shooter.getWidth() * 0.3, startH = shooter.getHeight() * 0.3 * 0.583333333, startSX = 20, startSY = 0;
        let imagePath = "assets/entities/bullet/right/bullet_right.png";
        
        switch(shooter.direction)
        {
        	case RIGHT:
        		startX = shooter.getX() + shooter.getWidth();
        		startY = shooter.getY() + (shooter.getHeight() * 0.4);
        		
        		startW = shooter.getWidth() * 0.3;
        		startH = shooter.getWidth() * 0.3 * 0.583333333;
        		
        		startSX = 20;
        		startSY = 0;
        		
        		imagePath = "assets/entities/bullet/right/bullet_right.png";
        		break;
        		
        	case LEFT:
        		startX = shooter.getX();
        	    startY = shooter.getY() + (shooter.getHeight() * 0.4);
        	    
        	    startW = shooter.getWidth() * 0.3;
        	    startH = shooter.getWidth() * 0.3 * 0.583333333;
        	    
        	    startSX = -20;
        		startSY = 0;
        		
        		imagePath = "assets/entities/bullet/left/bullet_left.png";
        		break;
        		
        	case DOWN:
        		startX = shooter.getX() + (shooter.getWidth()*0.35);
        		startY = shooter.getY() + (shooter.getHeight()*0.33);
        		
        		startW = shooter.getHeight() * 0.2 * 0.583333333;
        		startH = shooter.getHeight() * 0.3;
        		
        		startSX = 0;
        		startSY = 20;
        		
        		imagePath = "assets/entities/bullet/down/bullet_down.png";
        		break;
        		
        	case UP:
        		startW = shooter.getHeight() * 0.2 * 0.583333333;
        		startH = shooter.getHeight() * 0.2;
        		
        		startX = shooter.getX() + (shooter.getWidth()/3);
        		startY = shooter.getY() - startH;
        		
        		startSX = 0;
        		startSY = -20;
        		
        		imagePath = "assets/entities/bullet/up/bullet_up.png";
        		break;
      	}
        
        super(shooter.getState(), startX, startY, startW, startH, imagePath);

		this.direction = shooter.direction;
        this.speedX = startSX;
        this.speedY = startSY;
        this.shooter = shooter;
    }
    
    eraseBullet()
    {
    	this.destructor();
        this.shooter.shooted.splice(this.shooter.shooted.indexOf(this), 1)[0];
    }

    update()
    {
        this.move(this.speedX, this.speedY);

        let layer = Layers.getLayer("collision");

        let xPercent = (this.getX() + this.getWidth()/2) / layer.layer.width;
        let yPercent = (this.getY() + this.getHeight()/2) / layer.layer.height;

        if(this.collideWithLayer("collision", xPercent * bgWidth , yPercent * bgHeight))
        {
            this.eraseBullet();
        }
        else
        {
        	let touched = false;
        	let i = 0;
        	while(i < zombies.length && !touched)
        	{
		    	if(this.collideWithEntity(zombies[i]))
		    	{
		    		player.killCount++;
					zombies[i].death();
					touched = true;
		    	}
		    	i++;
        	}
        	
        	if(touched)
        	{
        		this.eraseBullet();
        	}
        }
    }
}
