/**
 * Entity class representing an element in the game
 */
class Entity
{
    /**
     * Build a new Entity
     * x : the default x coordinate (0 by default)
     * y : the default y coordinate (0 by default)
     * width : the default width (0 by default)
     * height : the default height (0 by default)
     * visible : true if the entity must be visible (true by default)
     * depth : the depth of the entity, the greater value is on the top (1 by default)
     */
    constructor(x = 0, y = 0, width = 0, height = 0, visible = true, depth = 1)
    {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.visible = visible;
        this.depth = depth;
    }

    /**
     * Return the x coordinate of the entity
     */
    getX() { return this.x; }
    /**
     * Change the x coordinate of the entity
     */
    setX(newX) { this.x = newX;}

    /**
     * Return the y coordinate of the entity
     */
    getY() { return this.y; }
    /**
     * Change the y coordinate of the entity
     */
    setY(newY) { this.y = newY;}

    /**
     * Return the width of the entity
     */
    getWidth() { return this.width; }
    /**
     * Change the width of the entity
     */
    setWidth(newWidth) {this.width = newWidth;};

    /**
     * Return the height of the entity
     */
    getHeight() { return this.height; }
    /**
     * Change the height of the entity
     */
    setHeight(newHeight) {this.height = newHeight;};

    /**
     * Return if the entity is visible
     */
	isVisible() { return this.visible; }
    /**
     * Change the visibility of the entity
     */
	setVisible(visible) { this.visible = visible; }

    /**
     * Return the depth of the entity
     */
    getDepth() { return this.depth; }
    /**
     * Change the depth of the entity
     */
    setDepth(depth) { this.depth = depth; }

    /**
     * Move the entity with the x increment and y increment
     */
    move(moveX, moveY)
    {
        this.setX(this.getX() + moveX);
        this.setY(this.getY() + moveY);
    }

    /**
     * Return if the dot at the given coordinates is in the entity
     */
    isIn(testX, testY)
    {
        return this.x < testX && this.x + this.width > testX && this.y < testY && this.y + this.height > testY;
    }

    /**
     * Return true if the both entity are colliding
     */
    collideWithEntity(entity)
    {
        return this.x < entity.x + entity.width && this.x + this.width > entity.x && this.y < entity.y + entity.height && this.y + this.height > entity.y;
    }

    /**
     * Return an array with [r, g, b, a] data of the pixel at the given coordinate
     */
    collideWithLayer(layer, x, y)
    {
		let canvas = document.createElement('canvas');
		canvas.width = 2;
		canvas.height = 2;
       	canvas.getContext("2d").drawImage(layer.layer, x-1, y-1, 2, 2, 0, 0, 2, 2);

        return canvas.getContext("2d").getImageData(0, 0, 1, 1).data;
    }

    /**
     * Return true if the entity is out od the game window
     */
    isOutOfGameWindow()
    {
        return this.x + this.width < 0 || this.x > getGameWidth() || this.y + this.height < 0 || this.y > getGameHeight();
    }

    /**
     * Add an event listener for the entity, the same way as DOM event
     */
	addEventListener(triggeredEvent, callback)
	{
		document.body.addEventListener(triggeredEvent, callback);
	}

    /**
     * Remove an event listener for the entity, the same way as DOM event
     */
	removeEventListener(triggeredEvent, callback)
	{
		document.body.removeEventListener(triggeredEvent, callback);
	}

    /**
     * A ready to use update function
     */
    update() { }
}
