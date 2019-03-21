class SimplePopupNPC extends NPC
{
    constructor(owningState, popupText, popupBackground, name, idleSprite, x, y, width, height)
	{
		super(owningState, name, idleSprite, x, y, width, height);

        this.popup = new TexturedEntity(owningState, x + width, y - width*0.33, width*2.5, height*0.33, popupBackground, true, this.getDepth()+1);
        this.popupLabel = new Label(owningState, popupText, x + width, y - width*0.33, width*2.5, height*0.33, true, this.getDepth()+2);
	}

    update()
    {
        super.update();

        if(this.isAround(player.getX(), player.getY(), Game.getGameHeight() * 0.15) && this.popup != null)
        {
            this.popup.destructor();
            this.popup = null;

            this.popupLabel.destructor();
            this.popupLabel = null;
        }
    }
}
