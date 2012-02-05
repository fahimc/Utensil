# Javascript lightweight toolkit

Javascript lightweight toolkit for app/game development
## About Framework & Components

This is a Javascript toolkit which contains helper methods to easily get elements X & Y positions, window width & height and much more. The Toolkit is broken into two parts, one is a lightweight essentials version and the other has much more methods.

I'm also adding custom standalone components.

*Below is a list of some of the core methods:*

 * Mouse X and Y
 * Window width and Height
 * Trace: add multiple arguments within one alert.
 * reset the style of an element.
 * Basic Tween
 * Image Loader
 * URL Loader
 * postURL: this funciton allows you to sent variable either through a POST or GET method.
 * Browser detector.


### Usage Examples
*Tween method*

`tween(thumbHolder, 0.5, "left", xx, "ease-out", 0);`

*Get X & Y Position*

    var x = getX(document.getElementById('box'));
    var y = getY(document.getElementById('box'));

## Toolkit Extra

*Below is a list of some of the methods:*
 * Enter frame function
 * Cross-browser addEventListener
 * Add Drag function to an element
 * Get load parameters.

### Usage Examples

*Enter Frame method*

    EnterFrame.addEvent(onEnterFrame);
    EnterFrame.start();
    
    function onEnterFrame(event)
    {
     alert('this is on enterframe');
    }

