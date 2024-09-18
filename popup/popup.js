document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleExtension');
  const statusText = document.getElementById('status');

  // Load the current state from chrome.storage
  chrome.storage.local.get('extensionEnabled', (result) => {
    const isEnabled = result.extensionEnabled ?? false;
    updateStatus(isEnabled);
  });

  toggleButton.addEventListener('click', () => {
    chrome.storage.local.get('extensionEnabled', (result) => {
      const isEnabled = result.extensionEnabled ?? false;
      const newStatus = !isEnabled;

      // Save the new status and notify the content script
      chrome.storage.local.set({ extensionEnabled: newStatus }, () => {
        updateStatus(newStatus);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { toggle: newStatus });
        });
      });
    });
  });

  function updateStatus(isEnabled) {
    statusText.textContent = `State: ${isEnabled ? 'Enabled' : 'Disabled'}`;
    statusText.className = isEnabled ? 'state-active' : 'state-disabled';
  }
});
