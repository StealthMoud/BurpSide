try {
    chrome.devtools.panels.create(
        "BurpSide",
        "", // Icon path
        "/src/devtools/panel.html",
        function (panel) {
            console.log("BurpSide Panel Created");
        }
    );
} catch (e) {
    console.error("BurpSide DevTools Error:", e);
}
