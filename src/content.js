// Function to hide the comments and recommendations sections
function hideElements() {
  const lowerElementsSectionComments = document.querySelector('#columns #below');
  const lowerElementsSectionRecommendations = document.querySelector('#columns #secondary');
  const lowerElementsPhone = document.querySelector('.watch-below-the-player');
  if (lowerElementsSectionComments && lowerElementsSectionRecommendations) {
    lowerElementsSectionComments.style.display = 'none';
    lowerElementsSectionRecommendations.style.display = 'none';
  }
  if (lowerElementsPhone) {
    lowerElementsPhone.style.display = 'none';
  }
}

// Function to show the comments and recommendations sections
function showElements() {
  const lowerElementsSectionComments = document.querySelector('#below');
  const lowerElementsSectionRecommendations = document.querySelector('#secondary');
  const lowerElementsPhone = document.querySelector('.watch-below-the-player');
  if (lowerElementsSectionComments && lowerElementsSectionRecommendations) {
    lowerElementsSectionComments.style.display = '';
    lowerElementsSectionRecommendations.style.display = '';
  }
  if (lowerElementsPhone) {
    lowerElementsPhone.style.display = '';
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggle !== undefined) {
    if (message.toggle) {
      hideElements(); // Hide elements if enabled
    } else {
      showElements(); // Show elements if disabled
    }
  }
});

// Observe changes to the DOM and hide elements when they are loaded if the extension is enabled
const observer = new MutationObserver(() => {
  chrome.storage.local.get('extensionEnabled', (result) => {
    if (result.extensionEnabled) {
      hideElements();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });

// Check if the extension is enabled on load
chrome.storage.local.get('extensionEnabled', (result) => {
  if (result.extensionEnabled) {
    hideElements(); // Hide elements if the extension is enabled on page load
  }
});