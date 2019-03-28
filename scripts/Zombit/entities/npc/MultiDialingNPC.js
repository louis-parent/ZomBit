class MultiDialingNPC extends SimpleDialingNPC
{
    constructor(owningState, textList, name, idleImage, x, y, width, height)
    {
        super(owningState, textList.splice(0, 1)[0], name, idleImage, x, y, width, height);

        this.texts = textList;
        this.texts.push("");
    }

    interact()
    {
        super.interact();
        if(this.texts != null){
            this.texts.push(this.dialingText);
            this.dialingText = this.texts.splice(0, 1)[0];
        }
    }
}
