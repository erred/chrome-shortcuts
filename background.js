chrome.commands.onCommand.addListener(function (cmd) {
  chrome.windows.getCurrent((window) => {
    chrome.tabs.query({ active: false, pinned: false, windowId: window.id }, (tabs) => {
      chrome.tabs.query({ active: true, windowId: window.id }, (curr) => {
        tabs = tabs.filter((t) => !t.pinned).map((t) => t.id);
        switch (cmd) {
          case "close-tabs-other":
            chrome.tabs.remove(tabs);
            break;
          case "close-tabs-left":
            chrome.tabs.remove(tabs.filter((t) => t < curr[0].id));
            break;
          case "close-tabs-right":
            chrome.tabs.remove(tabs.filter((t) => t > curr[0].id));
            break;
        }
      });
    });
  });
});
