document.addEventListener('DOMContentLoaded', function() {
    var splash = document.getElementById('splash-parallax'),
        layers = splash.childNodes,
        height = 200,
        scrollProgress;

    parallaxTransform(layers);

    window.addEventListener('scroll', function() {
        parallaxTransform(layers);
    });

    function parallaxTransform(layers) {
        var layersArray = Array.prototype.slice.call(layers);
        layers.forEach(function(layer, index) {
            layer.style.transform = "translateY(" + scrollProgress(layersArray) * index + "%)";
        });
    }

    function scrollProgress(layers) {
        return window.scrollY <= height ? -((100 / layers.length / 5) * (1 - window.scrollY / height)) : 0;
    }
});