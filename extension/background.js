// background.js (Service Worker) - ES Module import

// Import the Supabase client library using ES Module syntax from CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- Supabase Credentials ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// ---------------------------

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully via ES Module import.');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabase = null;
}

// --- Message Listener --- 
if (supabase) { // Only add listener if Supabase initialized successfully
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // --- Save Multi-Step Interaction --- 
    if (message.action === 'saveMultiStepInteraction') {
      if (!supabase) {
        console.error('Supabase client not initialized. Cannot save interaction.');
        sendResponse({ success: false, error: 'Supabase client not initialized' });
        return true;
      }
      const { firstOption, secondOption, website, path } = message;
      console.log(`Background received MultiStep: First: ${firstOption}, Second: ${secondOption}, Website: ${website}, Path: ${path}`);
      supabase
        .from('user_interactions')
        .insert([{
          selected_first_option: firstOption, // Assumes this column exists
          selected_second_option: secondOption, // Assumes this column exists
          website: website,
          path: path
        }])
        .then(({ data, error }) => {
          if (error) {
            console.error('Supabase insert error (user_interactions - multi):', error.message || JSON.stringify(error));
            sendResponse({ success: false, error: error.message || 'Unknown Supabase insert error' });
          } else {
            console.log('Supabase insert successful (user_interactions - multi).');
            sendResponse({ success: true });
          }
        })
        .catch(error => {
          console.error('Unexpected error during Supabase insert (user_interactions - multi):', error.message || JSON.stringify(error));
          sendResponse({ success: false, error: error.message || 'Unexpected error occurred' });
        });
      return true;
    }

    // --- Log YouTube Navigation --- 
    else if (message.action === 'logYouTubeNavigation') {
      if (!supabase) {
        console.error('Supabase client not initialized. Cannot log navigation.');
        sendResponse({ success: false, error: 'Supabase client not initialized' });
        return true;
      }
      const { website, path } = message;
      console.log(`Background received YouTube Navigation: Website='${website}', Path='${path}'`);
      // --- Debugging Logs (kept for now) ---
      console.log('Supabase client object before insert:', supabase);
      console.log('Data to insert into user_interactions:', { website: website, path: path });
      // --- End Debugging Logs ---
      supabase
        .from('user_interactions')
        .insert([{ website: website, path: path }]) // Assumes these columns exist
        .then(({ data, error }) => {
          if (error) {
            console.error('Supabase insert error (user_interactions - nav):', error.message || JSON.stringify(error));
            sendResponse({ success: false, error: error.message || 'Unknown Supabase insert error' });
          } else {
            console.log('Supabase insert successful (user_interactions - nav).');
            sendResponse({ success: true });
          }
        })
        .catch(error => {
          console.error('Unexpected error during Supabase insert (user_interactions - nav):', error.message || JSON.stringify(error));
          sendResponse({ success: false, error: error.message || 'Unexpected error occurred' });
        });
      return true;
    }

    // --- Default case --- 
    else {
      console.log('Background received unhandled message action:', message.action);
      sendResponse({ success: false, error: 'Unhandled action' });
      return false; // No async response needed
    }
  });
} else {
  console.error('Supabase connection failed to initialize. Message listener not added.');
}

console.log('Pixel Greeter background service worker started.');
