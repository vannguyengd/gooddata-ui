document.addEventListener("DOMContentLoaded", function () {
    var splash = document.getElementById("splash-parallax"),
        layers = splash.childNodes,
        height = 200;

    parallaxTransform(layers);

    window.addEventListener("scroll", function () {
        parallaxTransform(layers);
    });

    function parallaxTransform(parallaxLayers) {
        var layersArray = Array.prototype.slice.call(parallaxLayers);
        parallaxLayers.forEach(function (layer, index) {
            layer.style.transform = "translateY(" + scrollProgress(layersArray) * index + "%)";
        });
    }

    function scrollProgress(parallaxLayers) {
        return window.scrollY <= height
            ? -((100 / parallaxLayers.length / 5) * (1 - window.scrollY / height))
            : 0;
    }
});
