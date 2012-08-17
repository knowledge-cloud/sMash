window.onload = init;
window.onresize = onResizeEvent;


/*
Initiates the widget with the apropriate settings
*/
function init() {
	window.menu.hideSoftkeys();
	widget.setNavigationEnabled(false);
	widget.setDisplayPortrait();

    detectResolution();
}


/*
Called when the widget is activated in the full screen mode
*/
function activateFullScreenView() {
    setStyleSheet("Full Screen");
}


/*
Called when the widget is activated in the mini view home screen mode
*/
function activateHomeScreenView() {
    setStyleSheet("Home Screen");
}


/*
Closes the widget
*/
function onExit() {
    window.close();
}


/*
Uses the current window size to determine if the home screen view or the full screen view should be used.
*/
function detectResolution() {
    var screenHeight = screen.height;
    var windowHeight = window.innerHeight;
      
    if ( windowHeight < (0.5 * screenHeight) ) {
        activateHomeScreenView();
    } else {
        activateFullScreenView();
    }
}


/*
Called when the phone's orientation has changed
*/
function onResizeEvent() {
	detectResolution();
}


/*
Sets the correct css to be active
*/
function setStyleSheet(title) {
    var stylesheets = document.getElementsByTagName("link");
    for (var i = 0; i < stylesheets.length; i++) {
        var stylesheet = stylesheets[i];

        if (!stylesheet.getAttribute("title")) {
            continue;
        }

        if (stylesheet.getAttribute("title") != title) {
            stylesheet.disabled = true;
        } else {
            stylesheet.disabled = false;
        }
    }
}

