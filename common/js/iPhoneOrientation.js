/* updateOrientation checks the current orientation, sets the body's class attribute to portrait, landscapeLeft, or landscapeRight, 
 *    and displays a descriptive message on "Handling iPhone or iPod touch Orientation Events".  */
function updateOrientation()
{
    /*window.orientation returns a value that indicates whether iPhone is in portrait mode, landscape mode with the screen turned to the
     *    left, or landscape mode with the screen turned to the right. */
    var orientation=window.orientation;
    switch(orientation)
    {

        case 0:
            /* If in portrait mode, sets the body's class attribute to portrait. Consequently, all style definitions matching the body[class="portrait"] declaration
             *                 in the iPhoneOrientation.css file will be selected and used to style "Handling iPhone or iPod touch Orientation Events". */
            
            document.body.setAttribute("class","portrait");
            /* Add a descriptive message on "Handling iPhone or iPod touch Orientation Events"  */
            break;  

        case 90:
            /* If in landscape mode with the screen turned to the left, sets the body's class attribute to landscapeLeft. In this case, all style definitions matching the
             *                 body[class="landscapeLeft"] declaration in the iPhoneOrientation.css file will be selected and used to style "Handling iPhone or iPod touch Orientation Events". */
            document.body.setAttribute("class","landscapeLeft");
            break;

        case -90:   
            /* If in landscape mode with the screen turned to the right, sets the body's class attribute to landscapeRight. Here, all style definitions matching the 
             *                 body[class="landscapeRight"] declaration in the iPhoneOrientation.css file will be selected and used to style "Handling iPhone or iPod touch Orientation Events". */
            document.body.setAttribute("class","landscapeLeft");
            break;
    }

}
