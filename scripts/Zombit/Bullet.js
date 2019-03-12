class Bullet extends TexturedEntity
{
    constructor(shooter)
    {
        super(shooter.getX() + (shooter.lastSide > 0 ? shooter.getWidth() : 0), shooter.getY() + (shooter.getHeight() * 0.4), shooter.getWidth() * 0.3, shooter.getHeight() * 0.3 * 0.583333333, (shooter.lastSide == -1 ? "assets/entities/bullet/left/bullet_left.png" : "assets/entities/bullet/right/bullet_right.png"));

        this.speed = shooter.lastSide * 20;
        this.shooter = shooter;
    }
    
    eraseBullet()
    {
    	this.destructor();
        this.shooter.shooted.splice(this.shooter.shooted.indexOf(this), 1)[0];
    }

    update()
    {
        this.move(this.speed, 0);

        let layer = Layers.getLayer("collision");

        let xPercent = (this.getX() + (this.speed > 0 ? this.getWidth() : 0)) / layer.layer.width;
        let yPercent = (this.getY() + (this.getHeight()/2)) / layer.layer.height;

        if(this.collideWithLayer(layer, xPercent * bgWidth , yPercent * bgHeight)[3] > 0 )
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
