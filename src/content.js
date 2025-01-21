// Function to hide the comments and recommendations sections
function hideElements() {
  const currentURL = window.location.href;

  // Main page
  if (currentURL === 'https://www.youtube.com/' || currentURL === 'https://m.youtube.com/') {
    const mainSiteSectionRecommendations = document.querySelectorAll("#guide, #page-manager, .page-container");
    mainSiteSectionRecommendations.forEach(section => {
      section.style.display = 'none';
    });
  }

  // Every video page
  if (currentURL !== 'https://www.youtube.com/' && currentURL !== 'https://m.youtube.com/') {
    setTimeout(() => { // This timeout prevents the flashing of main window contents before the DOM is fully updated
      const mainSiteSectionRecommendations = document.querySelectorAll("#guide, #page-manager, .page-container");
      mainSiteSectionRecommendations.forEach(section => {
        section.style.display = '';
      });
    }, 850);

    const lowerElementsSectionComments = document.querySelector('#columns #below');
    const lowerElementsSectionRecommendations = document.querySelector('#columns #secondary');
    if (lowerElementsSectionComments && lowerElementsSectionRecommendations) {
      lowerElementsSectionComments.style.display = 'none';
      lowerElementsSectionRecommendations.style.display = 'none';
    }
    const endScreenElements = document.querySelector('.ytp-endscreen-content');
    if (endScreenElements) {
      endScreenElements.style.display = 'none';
    }
    const ceElements = document.querySelectorAll('.ytp-ce-element'); // in-video overlays
    ceElements.forEach(element => {
      element.style.display = 'none';
    });
    const rightScreenElements = document.querySelector('#chat');
    if (rightScreenElements) {
      rightScreenElements.style.display = 'none';
    }

    const lowerElementsPhone = document.querySelector('.watch-below-the-player');
    if (lowerElementsPhone) {
      lowerElementsPhone.style.display = 'none';
    }
  }
}

// Function to show the comments and recommendations sections
function showElements() {
  const currentURL = window.location.href;

  // Main page
  if (currentURL === 'https://www.youtube.com/' || currentURL === 'https://m.youtube.com/') {
    const mainSiteSectionRecommendations = document.querySelectorAll("#guide, #page-manager, .page-container");
    mainSiteSectionRecommendations.forEach(section => {
      section.style.display = '';
    });
  }

  // Every video page
  if (currentURL !== 'https://www.youtube.com/' && currentURL !== 'https://m.youtube.com/') {
    setTimeout(() => { // This timeout prevents the flashing of main window contents before the DOM is fully updated
      const mainSiteSectionRecommendations = document.querySelectorAll("#guide, #page-manager, .page-container");
      mainSiteSectionRecommendations.forEach(section => {
        section.style.display = '';
      });
    }, 850);

    const lowerElementsSectionComments = document.querySelector('#below');
    const lowerElementsSectionRecommendations = document.querySelector('#secondary');
    if (lowerElementsSectionComments && lowerElementsSectionRecommendations) {
      lowerElementsSectionComments.style.display = '';
      lowerElementsSectionRecommendations.style.display = '';
    }
    const endScreenElements = document.querySelector('.ytp-endscreen-content');
    if (endScreenElements) {
      endScreenElements.style.display = '';
    }
    const ceElements = document.querySelectorAll('.ytp-ce-element');
    ceElements.forEach(element => {
      element.style.display = '';
    });
    const rightScreenElements = document.querySelector('#chat');
    if (rightScreenElements) {
      rightScreenElements.style.display = '';
    }

    const lowerElementsPhone = document.querySelector('.watch-below-the-player');
    if (lowerElementsPhone) {
      lowerElementsPhone.style.display = '';
    }
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