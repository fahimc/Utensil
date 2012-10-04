![utensil](http://i1270.photobucket.com/albums/jj605/fahimchowdhury85/1.gif)

# Javascript Lightweight Toolkit

### [Code Documentation](https://github.com/fahimc/Utensil/wiki/*Code-Documentation*)

Javascript lightweight toolkit for app/game development
## About Framework & Components

This is a Javascript toolkit which contains helper methods to easily get elements X & Y positions, window width & height and much more. The Toolkit is broken into two parts, one is a lightweight essentials version and the other has much more methods.

I'm also adding custom standalone components.

*Below is a list of some of the core methods:*

 * Mouse X and Y
 * Window width and Height
 * Image Loader
 * URL Loader
 * postURL: this funciton allows you to sent variable either through a POST or GET method.
 * Browser detector.

## Get Window Width and Height  

    var width = Utensil.stageWidth();
    var height = Utensil.stageHeight();

## Get Mouse X and Y  
To get the X and Y coordinates you need to pass in an event to the following methods. For example you will create a mousemove event and then within that function you will be able to get the X and Y coordinates for any DOM element.  


    //create an event listener
    Utensil.addListener(document.body,"mousemove",onMouseMove);
    
    //mouse move function
    onMouseMove function(event)
    {
      var bodyX = Utensil.mouseX(document.body,event);
      var bodyY = Utensil.mouseY(document.body,event);
      
    }

## Add Cross Browser Event Listener  
You need to provide the element, the event name (without "on" for IE) and the trigger function.

    Utensil.addListener(document.body,"click",onBodyClicked);

## Remove Cross Browser Event Listener  
You need to provide the element, the event name (without "on" for IE) and the trigger function.

    Utensil.removeListener(document.body,"click",onBodyClicked);

## Load External Data
You can load external data using the URLLoader.load method. provide a URL and the callback function. rememeber to add two parameters to the callback function. The first is the raw text data and the second is xml data. The second parameter is not important unless you want to load xml.

    var url = "resource/json/settings.json"
    Utensil.URLLoader.load(url, loadHandler);
    
    function loadHandler(t,x)
    {
        
    }

### Usage Examples
*Tween method*

    Utensil.tween(thumbHolder, 0.5, "left", xx, "ease-out", 0);

*Get X & Y Position*

    var x = Utensil.getX(document.getElementById('box'));
    var y = Utensil.getY(document.getElementById('box'));

