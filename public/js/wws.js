/*
 * wws.js
 */

(function($) {
    let scroll = true;
    let scrollFactor = 0.4;
    let linkScrollSpeed = 1000;

    let $document = $(document);
    let $body = $("body");
    let $bodyHtml = $("body,html");

    if (browser.mobile)
        scroll = false;
    
    if (scroll) {
        (function() {
            let normalizeWheel = function(event) {
                let pixelStep = 10;
                let lineHeight = 40;
                let pageHeight = 800;
                let sX = 0, sY = 0;
                let pX = 0, pY = 0;

                if ("detail" in event)
                    sY = event.detail;
                else if ("wheelDelta" in event)
                    sY = event.wheelDelta / -120;
                else if ("wheelDeltaY" in event)
                    sY = event.wheelDeltaY / -120;

                if ("wheelDeltaX" in event)
                    sX = event.wheelDeltaX / -120;
                
                if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }

                pX = sX * pixelStep;
                pY = sY * pixelStep;
                if ("deltaY" in event)
                    pY = event.deltaY;
                if ("deltaX" in event)
                    pX = event.deltaX;

                if ((pX || pY) && event.deltaMode) {
                    if (event.deltaMode === 1) {
                        pX *= lineHeight;
                        pY *= lineHeight;
                    } else {
                        pX *= pageHeight;
                        pY *= pageHeight;
                    }
                }

                // fallback if spin cannot be determined
                if (pX && !sX)
                    sX = (pX < 1) ? -1 : 1;
                if (pY && !sY)
                    sY = (pY < 1) ? -1 : 1;

                return {
                    spinX: sX, spinY: sY,
                    pixelX: pX, pixelY: pY
                };
            };

            $body.on("wheel", function(event) {
                event.preventDefault();
                event.stopPropagation();
                // stop link scroll
                $bodyHtml.stop();

                let n = normalizeWheel(event.originalEvent);
                let x = (n.pixelX !== 0 ? n.pixelX : n.pixelY);
                let delta = Math.min(Math.abs(x), 150) * scrollFactor;
                let direction = x > 0 ? 1 : -1;
                $document.scrollLeft($document.scrollLeft() + (delta * direction));
            });
        })();
    }
})(jQuery);
