document.addEventListener("DOMContentLoaded", function () {
    var splash = document.getElementById("splash-parallax"),
        layers = splash.childNodes,
        height = 200;

    var layersPositions = Array.prototype.slice.call(layers).map(function(layer) {
        return {
            initial: parseInt(layer.getAttribute("initialposition")),
            final: parseInt(layer.getAttribute("finalposition"))
        }
    });

    parallaxTransform(layers);

    window.addEventListener("scroll", function () {
        parallaxTransform(layers);
    });

    function parallaxTransform(parallaxLayers) {
        parallaxLayers.forEach(function (layer, index) {
            layer.style.transform = "translateY(" + (layersPositions[index].final - (layersPositions[index].final - layersPositions[index].initial) * scrollProgress()) + "%)";
        });
    }

    function scrollProgress() {
        return window.scrollY <= height ? 1 - window.scrollY / height : 0;
    }
});
