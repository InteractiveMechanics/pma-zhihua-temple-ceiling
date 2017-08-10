
/**
 * For Debugging, allows you to capture the hov,voh location of the tiny temple pano
 */
function captureTempleHotspotLocation() {
    document.body.addEventListener("click", function() {
        var krpano = document.getElementById("krpanoSWFObjectTemple");
        var mx = krpano.get("mouse.x");
        var my = krpano.get("mouse.y");
        var pt = krpano.screentosphere(mx,my);

        alert("Horizontal: " + pt.x.toFixed(3) + "  Vertical: " + pt.y.toFixed(3));
    });
}

/**
 * Return the KRPano Ceiling Object
 */
function getKrpanoCeilingObject() {
    var krpano = document.getElementById("krpanoSWFObjectCeiling");
    return krpano;
}

/**
 * Return the KRPano Temple Object
 */
function getKrpanoCeilingObject() {
    var krpano = document.getElementById("krpanoSWFObjectTemple");
    return krpano;
}

/**
 * Returns the KRPano Lap View Object
 */
function getKrpanoObject() {
    var krpano = document.getElementById("krpanoSWFObject");
    return krpano;
}

/**
 * Zooms in on the lap view krpano to the @param value provided
 * @param {Number} val
 */
function krpanoZoomTo(val) {
    var krpano = getKrpanoObject();
    krpano.call("zoomto(" + val + ", tween('easeInOutQuad', 0.5));");
}

/**
 * Zooms in on the ceiling view krpano to the @param value provided
 * @param {Number} val
 */
function ceilingZoomTo(val) {
    var krpano = document.getElementById("krpanoSWFObjectCeiling");
    krpano.call("zoomto(" + val + ", tween('easeInOutQuad', 0.5));");
}

/**
 * Zooms in on the temple view krpano to the @param value provided
 * @param {Number} val
 */ 
function templeZoomTo(val) {
    var krpano = document.getElementById("krpanoSWFObjectTemple");
    krpano.call("zoomto(" + val + ", tween('easeInOutQuad', 0.5));");
}

/**
 * Moves the temple view krpano to the hov and voh provided
 * @param {Number} x
 * @param {Number} y
 */
function krpanoTempleMoveTo(x, y, zoom) {
    var krpano = document.getElementById("krpanoSWFObjectTemple");
    krpano.call("lookto(" + x + ", "+ y + ", " + zoom + ", tween('easeInOutQuad', 0.5));");
}

/**
 * Moves the lap view krpano to the hov and voh provided
 * @param {Number} x
 * @param {Number} y
 */
function krpanoMoveTo(x, y) {
    var krpano = getKrpanoObject();
    krpano.call("moveto(" + x + ", "+ y + ", tween('easeInOutQuad', 0.5));");
}

/**
 * Disables all interaction with the KR Pano
 */
function disablePano() {
    var krpano = getKrpanoObject();
        krpano.call("set(control.usercontrol, 'off');");
}

/**
 * Enables all interaction with the KR Pano
 */
function enablePano() {
    var krpano = getKrpanoObject();
        krpano.call("set(control.usercontrol, 'all');");
}