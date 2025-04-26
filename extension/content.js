// content.js
(function () {
  console.log("Pixel Greeter Content Script Loaded on:", window.location.hostname);

  // --- Variable to track if the chat UI DOM has been injected ---
  let chatUIDOMInjected = false; // Renamed for clarity
  let currentStep = 1;
  let firstSelection = null;

  // --- Function to send navigation data to background --- 
  function logNavigation() {
    const website = window.location.hostname; // e.g., 'www.youtube.com'
    const path = window.location.pathname + window.location.search + window.location.hash; // e.g., '/watch?v=...' or '/'
    
    console.log(`Logging navigation: Website='${website}', Path='${path}'`);
    
    chrome.runtime.sendMessage(
      { 
        action: 'logYouTubeNavigation', 
        website: website, 
        path: path 
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending navigation log:', chrome.runtime.lastError.message);
        } else if (response && !response.success) {
          console.error('Background script failed to log navigation:', response.error);
        } else {
          console.log('Navigation log sent successfully.');
        }
      }
    );
  }

  // --- Function to inject the chat UI DOM --- 
  function injectChatUIDom() {
    if (chatUIDOMInjected) return; // Prevent re-injecting DOM elements
    chatUIDOMInjected = true;     // Mark DOM as injected
    console.log("Injecting chat UI DOM...");

    const chatContainer = document.createElement('div');
    chatContainer.id = 'pixel-greeter-container';
    chatContainer.style.position = 'fixed';
    chatContainer.style.top = '60px';
    chatContainer.style.right = '10px';
    chatContainer.style.width = '300px';
    chatContainer.style.height = 'calc(100vh - 120px)';
    chatContainer.style.background = 'linear-gradient(180deg, #282c34 0%, #1e2127 100%)';
    chatContainer.style.zIndex = '2147483647';
    chatContainer.style.display = 'flex';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.justifyContent = 'center';
    chatContainer.style.alignItems = 'center';
    chatContainer.style.color = '#e6e6e6';
    chatContainer.style.textAlign = 'center';
    chatContainer.style.fontFamily = '"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
    chatContainer.style.border = '1px solid #4a4f58';
    chatContainer.style.borderRadius = '8px';
    chatContainer.style.boxSizing = 'border-box';
    chatContainer.style.padding = '20px';
    chatContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';

    let questionElement = document.createElement('p');
    questionElement.id = 'pixel-greeter-question';
    questionElement.textContent = 'What brings you here today?';
    questionElement.style.fontSize = '1.4em';
    questionElement.style.fontWeight = '600';
    questionElement.style.marginBottom = '25px';
    questionElement.style.color = '#ffffff';

    let initialOptions = [
      'Just browsing',
      'Learning something new',
      'Looking for entertainment',
      'Killing time'
    ];

    let buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'pixel-greeter-buttons';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexDirection = 'column';
    buttonsContainer.style.width = '100%';
    buttonsContainer.style.alignItems = 'stretch';

    let interactionStep = 1;
    firstSelection = null;

    function getFollowUpOptions(firstChoice) {
        console.log(`Generating follow-up based on: ${firstChoice}`);
        if (firstChoice === 'Learning something new') {
            return ['Specific topic?', 'From tutorials?', 'Reading articles?', 'Watching videos?'];
        } else if (firstChoice === 'Looking for entertainment') {
            return ['Movies?', 'Music?', 'Games?', 'Social media?'];
        } else {
            return ['Anything specific?', 'Just relaxing?', 'Taking a break?', 'Need suggestions?'];
        }
    }

    function handleButtonClick(selectedOption) {
        if (interactionStep === 1) {
            firstSelection = selectedOption;
            interactionStep = 2;

            questionElement.textContent = `Interesting choice: "${firstSelection}". Tell me more?`;

            const followUpOptions = getFollowUpOptions(firstSelection);
            createButtons(followUpOptions);

        } else if (interactionStep === 2) {
            const secondSelection = selectedOption;
            const website = window.location.hostname;
            const path = window.location.pathname;

            console.log(`Step 1: ${firstSelection}, Step 2: ${secondSelection}, Website: ${website}, Path: ${path}`);

            chrome.runtime.sendMessage(
                {
                    action: 'saveMultiStepInteraction',
                    firstOption: firstSelection,
                    secondOption: secondSelection,
                    website: website,
                    path: path
                },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error sending message:', chrome.runtime.lastError.message);
                    } else if (response && response.success) {
                        console.log('Interaction saved successfully via background script.');
                    } else {
                        console.error('Failed to save interaction:', response ? response.error : 'No response');
                    }
                }
            );

            showThankYouSlide();
        }
    }

    function createButtons(optionsArray) {
      buttonsContainer.innerHTML = '';
      optionsArray.forEach(optionText => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.style.marginBottom = '12px';
        button.style.padding = '12px 20px';
        button.style.border = '1px solid #5c6370';
        button.style.borderRadius = '6px';
        button.style.backgroundColor = 'transparent';
        button.style.color = '#c8c8c8';
        button.style.cursor = 'pointer';
        button.style.fontSize = '1em';
        button.style.fontWeight = '500';
        button.style.width = '100%';
        button.style.textAlign = 'center';
        button.style.transition = 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease';

        button.addEventListener('mouseover', () => {
          button.style.backgroundColor = '#3a3f47';
          button.style.color = '#ffffff';
          button.style.borderColor = '#7a8290';
        });
        button.addEventListener('mouseout', () => {
          button.style.backgroundColor = 'transparent';
          button.style.color = '#c8c8c8';
          button.style.borderColor = '#5c6370';
        });

        button.addEventListener('click', () => handleButtonClick(optionText));

        buttonsContainer.appendChild(button);
      });
    }

    function showThankYouSlide() {
      questionElement.textContent = 'Got it, thanks!';
      buttonsContainer.innerHTML = '';
      questionElement.style.fontSize = '1.6em';

      setTimeout(() => {
        let opacity = 1;
        const fadeOutInterval = setInterval(() => {
          if (opacity <= 0) {
            clearInterval(fadeOutInterval);
            if (chatContainer.parentNode) {
              chatContainer.parentNode.removeChild(chatContainer);
            }
          } else {
            chatContainer.style.opacity = opacity;
            opacity -= 0.05;
          }
        }, 50);
      }, 2000);
    }

    chatContainer.appendChild(questionElement);
    chatContainer.appendChild(buttonsContainer);
    document.body.appendChild(chatContainer);

    createButtons(initialOptions);
  }

  // --- Function to decide WHEN to show the chat popup --- 
  function handlePopupLogic() {
    const isOnYouTube = window.location.hostname.includes('youtube.com');
    if (!isOnYouTube) return; // Only applies to YouTube

    const currentPath = window.location.pathname;
    const isHomepage = (currentPath === '/' || currentPath === '/index.html'); // Basic check for homepage
    const popupShown = sessionStorage.getItem('popupShownThisSession') === 'true';

    console.log(`handlePopupLogic: Path='${currentPath}', isHomepage=${isHomepage}, popupShown=${popupShown}`);

    if (isHomepage) {
        console.log("On YouTube homepage, ensuring chat UI is injected.");
        injectChatUIDom(); // Show/ensure chat is there on homepage visit
        // We don't set the sessionStorage flag here, allow it on every homepage visit
    } else if (!popupShown) {
        console.log("First YouTube visit this session (not homepage), injecting chat UI and setting flag.");
        injectChatUIDom(); // Show chat on first visit
        sessionStorage.setItem('popupShownThisSession', 'true'); // Mark as shown for this session
    } else {
        console.log("Popup already shown this session (and not on homepage), not injecting again.");
        // Optional: If the chat UI exists but should be hidden on non-homepage subsequent visits,
        // you could add logic here to hide chatContainer.style.display = 'none';
        // For now, we just don't call injectChatUIDom() again.
    }
  }

  // --- Initial check and logic execution --- 
  function initialize() {
    if (window.location.hostname.includes('youtube.com')) {
      // Use setTimeout to run slightly after script load
      setTimeout(() => {
        logNavigation();     // Log the initial navigation
        handlePopupLogic();  // Decide whether to show the popup initially
      }, 100); 
    } else {
      console.log("Pixel Greeter: Not a targeted media site.");
    }
  }

  // --- Event listener for YouTube navigation --- 
  document.addEventListener('yt-navigate-finish', (event) => {
    console.log("'yt-navigate-finish' event detected.");
    // Add a small delay 
    setTimeout(() => {
        logNavigation();    // Log the navigation first
        handlePopupLogic(); // Decide whether to show the popup after navigation
    }, 100); 
  });

  console.log("Pixel Greeter Content Script: Initializing...");
  initialize();

})();