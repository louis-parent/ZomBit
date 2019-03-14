class PNJ extends TexturedEntity
{
	constructor(owningState, name, idleSprite, x, y, width, height)
	{
		super(owningState, x, y, width, height, idleSprite);
		
		this.name = name;
		
		this.nameLabel = new Label("<center>" + name + "</center>", owningState, x, y - 25 - this.height * 0.01, this.width, 25);
	}
	
	update()
	{
		this.nameLabel.setX(this.getX());
		this.nameLabel.setY(this.getY() - this.nameLabel.getHeight() - this.getHeight() * 0.01);
	}
}
