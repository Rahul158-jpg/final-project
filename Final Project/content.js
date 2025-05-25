chrome.storage.local.get(["darkMode"], function (result) {
  if (result.darkMode) {
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
  }
});