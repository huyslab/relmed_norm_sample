import { preventRefresh} from "./participation-validation.js"

/**
 * Data handling and communication utilities
 * Manages data saving, state updates, and communication with parent windows/servers
 */

/**
 * Sends messages to parent window with security validation
 * Used for communication between iframe and parent window in web experiments
 * @param {Object} message - Message object to send to parent
 * @param {Function} fallback - Callback function to execute if messaging fails
 */
function postToParent(message, fallback = () => {}) {
    try {
        if (window.parent && window.parent.postMessage) {
            const allowedOrigins = [
                'http://localhost:3000',
                'https://relmed.ac.uk',
                'https://www.relmed.ac.uk'
            ];

            // Normalize a URL by removing trailing slashes
            const normalizeUrl = (url) => url.replace(/\/+$/, '');

            // Get the parent URL and normalize it
            const parentUrl = normalizeUrl(document.referrer || window.parent.location.origin);

            // Check if the normalized parent URL matches any of the allowed origins
            const isAllowed = allowedOrigins.some(origin => normalizeUrl(origin) === parentUrl);

            if (isAllowed) {
                window.parent.postMessage(message, parentUrl);
            } else {
                // console.warn("Parent URL does not match any allowed origins:", parentUrl);
                fallback();
            }
        } else {
            console.warn("Parent window or postMessage is unavailable.");
            fallback();
        }
    } catch (error) {
        console.warn("Failed to send message to parent window:", error);

        // Implement a fallback or handle the error
        fallback();
    }
}

/**
 * Updates experiment state and optionally saves data
 * Coordinates state management between client and server
 * @param {string} state - Current experiment state identifier
 * @param {boolean} save_data - Whether to save data to REDCap (default: true)
 */
function updateState(state, save_data = true) {

    // Save data to REDCap
    if (!state.includes("no_resume") && save_data){
        saveDataREDCap();
    }

    // Update bonus state
    // updateBonusState();

    console.log(state);
    postToParent({
        state: state
    });
}

/**
 * Saves experimental data to REDCap database with retry mechanism
 * Handles both RELMED and Prolific data submission contexts
 * @param {number} retry - Number of retry attempts remaining (default: 1)
 * @param {Object} extra_fields - Additional fields to include in data submission
 * @param {Function} callback - Callback function to execute after successful submission
 */
function saveDataREDCap(retry = 1, extra_fields = {}, callback = () => {}) {

    // Get data, remove stimulus string to reduce payload size
    const jspsych_data = jsPsych.data.get().ignore('stimulus').json();

    // Get interaction data (mouse movements, focus changes, etc.)
    const interaction_data = jsPsych.data.getInteractionData().json();

    // Combine interaction data with jsPsych data
    const combined_data = JSON.stringify([
        {
            interaction_data: interaction_data,
            jspsych_data: jspsych_data
        }
    ]);

    console.log(window.module)

    const data_message = {
        data: {
            record_id: window.participantID + "_" + window.module_start_time,
            participant_id: window.participantID,
            sitting_start_time: window.module_start_time,
            session: window.session,
            module: window.module,
            data: combined_data 
        },
        ...extra_fields
    };

    console.log("Data to be sent:", data_message);

    if (window.context === "relmed") {
        // Check if we're in a development environment
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log("Development mode: skipping data save to parent");
            callback();
            return;
        }

        postToParent(
            data_message,
            () => {
                if (retry > 0) {
                    console.warn(`Failed to save data, retrying... (${retry} attempts left)`);
                    // Exponential backoff: 1s, 2s, 4s, etc.
                    const delay = Math.pow(2, (3 - retry)) * 1000;
                    setTimeout(function () {
                        saveDataREDCap(retry - 1);
                    }, delay);
                } else {
                    console.error('Failed to submit data after retrying.');
                }
                
            }
        );

        callback();

    } else if (window.context === "prolific") {

        // Prepare REDCap record for Prolific context
        var redcap_record = JSON.stringify([{
            record_id: window.participantID + "_" + window.module_start_time,
            participant_id: window.participantID,
            sitting_start_time: window.module_start_time,
            session: window.session,
            module: window.module,
            data: combined_data
        }])
    
        // Submit data via AWS Lambda endpoint for Prolific studies
        fetch('https://h6pgstm0f9.execute-api.eu-north-1.amazonaws.com/prod/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: redcap_record
        })
        .then(data => {
            if (data.status === 200) {
                console.log('Data successfully submitted to REDCap');
            } else {
                console.error('Error submitting data:', data.message);
            }
            return data.json()
        })
        .then(data => {
            console.log(data)
            callback(); // Call the callback function if submission is successful
        }
        )
        .catch(error => {
            console.error('Error:', error);
            if (retry > 0) {
                console.log('Retrying to submit data...');
                setTimeout(function(){
                    saveDataREDCap(retry - 1);
                }, 1000);
            } else {
                console.error('Failed to submit data after retrying.');
                callback(error); // Call the callback function with the error if retries are exhausted
            }
        });
    }

}

/**
 * Handles experiment completion and final data submission
 * Removes page refresh prevention and redirects participants appropriately
 */
function endExperiment() {

    // Print end experiment message
    console.log("Experiment finished. Sending final data...");

    // Remove beforeunload event listener to allow page navigation
    window.removeEventListener('beforeunload', preventRefresh);

    // Save data with end task message for RELMED context
    saveDataREDCap(
        10, 
        {
            message: "endTask"
        },
        () => {
            window.location.href = "https://app.prolific.com/submissions/complete?cc=C1AMSNUV"
        }
    );
}

// Export functions for use in other modules
export {
    postToParent,
    updateState,
    saveDataREDCap,
    endExperiment
};


