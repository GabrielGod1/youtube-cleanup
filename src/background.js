chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggle !== undefined) {
    chrome.storage.local.get('extensionEnabled', (result) => {
      if (result.extensionEnabled) {
        console.log('Extension Enabled');
      } else {
        console.log('Extension Disabled');
      }
    });
  }
});
