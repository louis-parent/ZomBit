/**
 * TexturedEntity class representing a DisplayedEntity with a texture image as sprite
 */
class TexturedEntity extends DisplayedEntity
{
    /**
     * Build a new TexturedEntity
     * x : the default x coordinate (0 by default)
     * y : the default y coordinate (0 by default)
     * width : the default width (0 by default)
     * height : the default height (0 by default)
     * image : the path of the texture image
     * visible : true if the entity must be visible (true by default)
     * depth : the depth of the entity, the greater value is on the top (1 by default)
     */
    constructor(x = 0, y = 0, width = 0, height = 0, image = "", visible = true, depth = 1)
    {
    	super(x, y, width, height, visible, depth);

        this.dom = document.createElement("img");
        this.dom.classList.add("textured-entity");
        this.dom.src = image;
        this.dom.width = width;
        this.dom.height = height;
        this.dom.style.position = "absolute";
        this.dom.style.left = this.getX() + "px";
        this.dom.style.top = this.getY() + "px";
        this.dom.style.zIndex = depth;
        this.dom.style.display = this.visible ? "block" : "none";

        document.body.appendChild(this.dom);

        this.animating = false;
        this.currentFrame = 0;
        this.animation = new Array();
        this.frameDelay = 0;
    }

    /**
     * Change the sprite of the TexturedEntity
     */
    setSprite(image) { this.dom.src = image; }

    /**
     * Anime the sprite with a sequence of image
     * imageArray : array of image path used in sequence by the animation
     * frameDelay : the delay between each frame of the sequence
     * force : true if the animation must be change even if the animation is already playing (false by default)
     */
	animate(imageArray, frameDelay, force = false)
	{
		if(!this.animating || force)
		{
			this.animating = true;
			this.currentFrame = 0;
			this.animation = imageArray;
			this.frameDelay = frameDelay;

			this.doAnimation(this);
		}
	}

    /**
     * Play the animation of the target (this by default)
     */
	doAnimation(target = this)
    {
      	if(target.animating)
      	{
            target.setSprite(target.animation[target.currentFrame]);

            target.currentFrame++;
            if(target.currentFrame >= target.animation.length){ target.currentFrame = 0; }

       		setTimeout(target.doAnimation, target.frameDelay, target);
      	}
    }

    /**
     * Stop the current animation
     */
	stopAnimation()
	{
		this.animating = false;
	}

    /**
     * Continue a stoped animation
     */
	continueAnimation()
	{
		this.animating = true;
		this.doAnimation(this);
	}

    /**
     * Restart an animation at its beginning
     */
	restartAnimation()
	{
		this.animating = true;
		this.currentFrame = 0;
		this.doAnimation(this);
	}
}
