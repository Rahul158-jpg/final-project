document.getElementById("block-btn").addEventListener("click", () => {
  const input = document.getElementById("site-input");
  const site = input.value.trim();
  if (site) {
    chrome.storage.local.get({ blockedSites: [] }, function (result) {
      const sites = result.blockedSites;
      sites.push(site);
      chrome.storage.local.set({ blockedSites: sites }, function () {
        location.reload();
      });
    });
  }
});

document.getElementById("dark-toggle").addEventListener("change", function () {
  chrome.storage.local.set({ darkMode: this.checked });
});

window.onload = function () {
  chrome.storage.local.get({ blockedSites: [], darkMode: false, stats: {} }, function (result) {
    const list = document.getElementById("site-list");
    result.blockedSites.forEach((site, index) => {
      const li = document.createElement("li");
      li.textContent = site;
      li.addEventListener("click", () => {
        result.blockedSites.splice(index, 1);
        chrome.storage.local.set({ blockedSites: result.blockedSites }, () => location.reload());
      });
      list.appendChild(li);
    });

    // Set dark mode toggle state
    document.getElementById("dark-toggle").checked = result.darkMode;

    // Show stats
    const stats = result.stats || {};
    const today = new Date().toISOString().split("T")[0];
    const count = stats[today] || 0;
    document.getElementById("stats").innerText = `Blocked Attempts Today: ${count}`;
  });
};