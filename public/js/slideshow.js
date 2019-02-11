/*
 * js/slideshow.js
 */

const nImages = 8;

const loadImage = async (n) => new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `/img/slideshow/${n}.jpg`;
});

const loadImages = async () => {
    let promises = [];
    for (let i = 2; i <= nImages; i++) {
        promises.push(loadImage(i));
    }

    try {
        let slideshow = document.getElementById("slideshow");
        let images = await Promise.all(promises);
        for (let i = 0; i < images.length; i++) {
            slideshow.appendChild(images[i]);
        }
    } catch(err) {
        console.error(err);
    }
};

loadImages().then(() => {
    $(function() {
        $("#slideshow img:gt(0)").hide();
        setInterval(function() {
            $("#slideshow :first-child").fadeOut(600)
                .next("img").fadeIn(600)
                .end().appendTo("#slideshow");
        }, 4000);
    });
});
