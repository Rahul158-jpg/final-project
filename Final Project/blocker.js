chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    chrome.storage.local.get(["blockedSites", "stats"], function(result) {
      const url = new URL(details.url);
      if (result.blockedSites && result.blockedSites.includes(url.hostname)) {
        const today = new Date().toISOString().split("T")[0];
        const stats = result.stats || {};
        stats[today] = (stats[today] || 0) + 1;
        chrome.storage.local.set({ stats });
        chrome.tabs.update(details.tabId, { url: "blocked.html" });
      }
    });
  },
  { urls: ["<all_urls>"] }
);