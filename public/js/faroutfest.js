/*
 * js/faroutfest.js
 */

(function($) {
    let scrollFactor = 0.4;
    let linkScrollSpeed = 1000;

    let $window = $(window);
    let $document = $(document);
    let $body = $("body");
    let $bodyHtml = $("body,html");
    let $van = $("#van");

    let isMobile = $body.innerWidth() <= 1000;

    let screenUnit = isMobile ? $body.innerHeight() : $body.innerWidth();
    let totalProgress = 4.4 * screenUnit;

    let vanWidth = $van.innerWidth();
    let vanLeftMin = -0.40 * $body.innerWidth();
    let vanLeftMax = ($body.innerWidth() - vanWidth) / 2;
    let vanLeft = vanLeftMin;
    let vanBreakpoint = Math.abs(vanLeftMin) + vanLeftMax;

    (function() {
        $van.css("bottom", 40 + $("#nav-wrapper").innerHeight());

        let normalizeWheel = function(event) {
            let pixelStep = 10;
            let lineHeight = 40, pageHeight = 800;
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

        let scrollMobile = function(delta) {
            let docTop = $document.scrollTop();
            $document.scrollTop(docTop + delta);
            return docTop;
        };

        let scrollDesktop = function(delta) {
            let docLeft = $document.scrollLeft();
            $document.scrollLeft(docLeft + delta);
            return docLeft;
        };

        let scrollVan = function(delta) {
            vanLeft += delta;
            $van.css("left", vanLeft);
        };

        // supports desktop scrolling via wheel events
        let scrollHandler = function(event) {
            event.preventDefault();
            event.stopPropagation();
            // stop link scroll
            $bodyHtml.stop();

            let n = normalizeWheel(event.originalEvent);
            let x = (n.pixelX !== 0 ? n.pixelX : n.pixelY);
            let delta = Math.min(Math.abs(x), 150) * scrollFactor * (x > 0 ? 1 : -1);

            let scroll;
            if ($body.innerWidth() <= 1000)
                scroll = scrollMobile(delta);
            else
                scroll = scrollDesktop(delta);

            let progress = scroll;
            if (progress > 0) {
                let barW = Math.round((progress / totalProgress) * $("#nav").innerWidth());
                $("#progress").css("width", barW);
            }

            // van drive-in animation
            let offset = vanLeft + delta;
            if (offset < vanLeftMax && offset > vanLeftMin && scroll < vanBreakpoint)
                scrollVan(delta);
        };

        $body.on("wheel", scrollHandler);

        // link scrolling
        $body.on("mousedown mouseup", "a[href^=\"#\"]", function (event) {
            event.stopPropagation();
        }).on("click", "a[href^=\"#\"]", function (event) {
            let $this = $(this);
            let href = $this.attr("href");

            let $target;
            if (href == "#" || ($target = $(href)).length == 0)
                return;

            event.preventDefault();
            event.stopPropagation();

            // calculate target position
            let x, y;
            if ($body.innerWidth() <= 1000) {
                x = $target.offset().top - (Math.max(0, $window.height() - $target.outerHeight()) / 2);
                y = { scrollTop: x };
            } else {
                x = $target.offset().left - (Math.max(0, $window.width() - $target.outerWidth()) / 2);
                y = { scrollLeft: x };
            }

            $bodyHtml.stop().animate(y, linkScrollSpeed, "swing");
        });

        /*
        // re-calculate window constants on resize
        $(window).on("resize", function() {
            vanLeftMin = -0.40 * $("body").innerWidth();
            vanLeftMax = 0.44 * $("body").innerWidth();

            navBreakpoint = $("body").innerWidth() <= 1000 ? $("body").innerHeight() : $("body").innerWidth();
            vanBreakpoint = Math.abs(vanLeftMin) + vanLeftMax;
        });
        */
    })();
})(jQuery);
