/**
 * Array of Layer of the current game
 */
var layers = new Array();

/**
 * Layers class to simply manage layers of the current game
 */
class Layers
{
    /**
     * Create a new Layer in the current game
     * name : name of the new layer
     * layerImage : image of the layer (empty by default)
     * fullSize : true if the layer is adapted at the game size (false by default)
     * visible : true if the layer must be visible (true by default)
     * depth : the depth of the layer, the greater value is on the top (0 by default)
     */
    static createLayer(name, layerImage = "", fullSize = false, visible = true, depth = 0)
    {
        let layer = new Layer(name, layerImage, fullSize, visible, depth);
        layers.push(layer);
        layer.addToGame();
        
        return layer;
    }

    /**
     * Return the layer with the given name, null if it not exist
     */
    static getLayer(layerName)
    {
        let i = 0;
        let layer = null;

        while(i < layers.length && layer == null)
        {
            layer = (layers[i].getName() == layerName ? layers[i] : null);
            i++;
        }

        return layer;
    }
}

/**
 * Layer class representing a layer image of the game
 */
class Layer
{
    /**
     * Build a new Layer
     * name : name of the new layer
     * layerImage : image of the layer (empty by default)
     * fullSize : true if the layer is adapted at the game size (false by default)
     * visible : true if the layer must be visible (true by default)
     * depth : the depth of the layer, the greater value is on the top (0 by default)
     */
    constructor(name, layerImage = "", fullSize = false, visible = true, depth = 0)
    {
        this.name = name;
        this.fullSize = fullSize;
        this.visible = visible;
        this.depth = depth;

        this.layer = document.createElement("img");
        this.layer.classList.add("layer");
        this.layer.setAttribute("draggable", false);
        this.layer.ondragstart = function() { return false; };
		this.layer.style += "pointer-events: none; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;";
        this.layer.id = name;
        this.layer.src = layerImage;

        this.layer.style.position = "absolute";
        this.layer.style.top = "0";
        this.layer.style.left = "0";
        this.layer.style.bottom = "0";
        this.layer.style.right = "0";

        this.width = "auto";
        this.height = "auto";

        this.layer.style.width = (fullSize ? "100%" : "auto");
		this.layer.style.height = (fullSize ? "100%" : "auto");

        this.layer.style.zIndex = (visible ? this.depth : -9999);
    }

    /**
     * Show the layer in the game
     */
    addToGame()
    {
        document.body.appendChild(this.layer);
    }

    /**
     * Return true if the layer is visible, false else
     */
    isVisible() { return this.visible; }

    /**
     * Change the visibility of the layer
     */
    setVisible(visible)
    {
        this.visible = visible;
        this.layer.style.zIndex = (visible ? this.depth : -9999);
    }

    /**
     * Return the depth of the layer
     */
    getDepth() { return this.depth; }

    /**
     * Change the depth of the layer
     */
    setDepth(depth)
    {
        this.depth = depth;
        if(this.visible)
        {
            this.layer.style.zIndex = depth;
        }
    }

    /**
     * Change the image of the layer
     */
    setImage(layerImage)
    {
        this.layer.src = layerImage;
    }

    /**
     * Return true if the layer take the fullsize of the game, false else
     */
	isFullSize()
	{
		return this.fullSize;
	}

    /**
     * Change if the layer take the full size
     */
	setFullSize(fullSize)
	{
		this.fullSize = fullSize;
		this.layer.style.width = (fullSize ? "100%" : (this.width == "auto" ? this.width : this.width + "px"));
		this.layer.style.height = (fullSize ? "100%" : (this.height == "auto" ? this.height : this.height + "px"));
	}

	/**
	 * Return the width of the layer
	 */
	getWidth() { return this.width; }
	/**
	 * Reset the height to auto
	 */
	resetWidth()
	{
		this.width = "auto";
		if(!this.isFullSize())
		{
			this.layer.style.width = this.width;
		}
	}
	/**
	 * Change the width of the layer
	 */
	setWidth(newWidth)
	{
		this.width = newWidth;
		if(!this.isFullSize())
		{
			this.layer.style.width = this.width + "px";
		}
	}

	/**
	 * Return the height of the layer
	 */
	getHeight() { return this.height; }
	/**
	 * Reset the height to auto
	 */
	resetHeight()
	{
		this.height = "auto";
		if(!this.isFullSize())
		{
			this.layer.style.height = this.height;
		}
	}
	/**
	 * Change the height of the layer
	 */
	setHeight(newHeight)
	{
		this.height = newHeight;
		if(!this.isFullSize())
		{
			this.layer.style.height = this.height + "px";
		}
	}

	/**
	 * Scale the layer in percent of game width view size
	 */
	 scaleWidth(percent)
	 {
	 	let w = (Game.getGameWidth() * (percent / 100));
	 	let h = w * (this.height / this.width);
	 	
	 	if(!this.isFullSize())
		{
			this.layer.style.height = "auto";
			this.layer.style.width = w + "px";
		}
		
		this.width = w;
	 	this.height = h;
	 }
	 
	 /**
	 * Scale the layer in percent of game height view size
	 */
	 scaleHeight(percent)
	 {
	 	let h = (Game.getGameHeight() * (percent / 100));
	 	let w = h * (this.widht / this.height);
	 	
	 	if(!this.isFullSize())
		{
			this.layer.style.width = "auto";
			this.layer.style.height = h + "px";
		}
		
		this.width = w;
	 	this.height = h;
	 }

    /**
     * Return the name of the layer
     */
    getName() { return this.name; }

    /**
     * Change the name of the layer
     */
    setName(name)
    {
        this.name = name;
        this.layer.id = name;
    }

    /**
     * Return an array with [r, g, b, a] data of the pixel at the given coordinate
     */
    getPixel(x, y)
    {
        let canvas = document.createElement('canvas');
		canvas.width = 2;
		canvas.height = 2;
       	canvas.getContext("2d").drawImage(this.layer, x-1, y-1, 2, 2, 0, 0, 2, 2);

        return canvas.getContext("2d").getImageData(0, 0, 1, 1).data;
    }
}
