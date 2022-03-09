function resizeRoadmap() {
    var iframe = document.getElementById("roadmap");
    var header = document.getElementsByClassName("fixedHeaderContainer")[0];
    var postHeader = document.getElementsByClassName("postHeader")[0];
    if (!iframe || !header || !postHeader) {
        return;
    }

    // leave some extra padding around the iframe to give it some space
    var padding = 100;
    // never drop below a certain height to keep the roadmap usable
    var minHeight = 600;
    var newDesiredHeight = window.innerHeight - header.scrollHeight - postHeader.scrollHeight - padding;
    iframe.setAttribute("height", Math.max(newDesiredHeight, minHeight));
}
