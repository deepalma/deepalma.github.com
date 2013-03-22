#ajs-box demo
This demo is created using the angular custom directive published here 
https://github.com/deepalma/angularjs-stuff/tree/master/ajs-box-directives

This directives let you create a 3D Layout for a fullscreen webapp using CSS3 3d Transforms.
They create a 3d Box in your viewport with 1 to 6 faces. 
You can write your own html inside each face as if you are inside a plain html element.
The directives handles all browser vendor prefixes and they are completely resolution independent.
You can choose which faces to use (front, top, botto, rear, left and right) just adding the relative directive in the markup.
Transition between faces are also provided.
The directives addresses also the negative z-index issue that affect iOS devices (tested on iphone and ipad with iOS 6)
At the moment Zepto.js is required.

##Usage
Just add the following code inside you body tag:
    <ajs-container perspective="1000">
      		<ajs-stage>
		    		<ajs-box class="showFront">
				    	<ajs-top>
                <!--Your HTML code goes here-->
              </ajs-top>
              <ajs-front>
                <!--Your HTML code goes here-->
              </ajs-front>
              <ajs-bottom>
                <!--Your HTML code goes here-->
              </ajs-bottom>
              <ajs-rear>
                <!--Your HTML code goes here-->
              </ajs-rear>
              <ajs-left>
                <!--Your HTML code goes here-->
              </ajs-left>
              <ajs-right>
                <!--Your HTML code goes here-->
              </ajs-right>
          </ajs-stage>
    </ajs-container>

You don't have to use all box faces and also the insertion order is not important.
The directive will add a "face" class to all faces and also a proper class (e.g. "top", "front", and so on).
In order to use the transition between pages you have to create a controller called "BoxCtrl in your controllers file.
The controller must have a scope property called "match".
Assigning to "$scope.match" a value between 1 and 6 will fire the transition.
The perspective attribute in the ajs-container can be omitted (default il 1000px).


Here a working demo http://deepalma.github.com/ajs-box-demo/
Just press numbers from 1 to 6 in your keyboard to fire transitions.
Touch gesture transition will be released soon.

