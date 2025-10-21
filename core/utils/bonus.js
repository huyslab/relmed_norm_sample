/**
 * Bonus calculation utilities for experimental tasks
 * Handles bonus computation and payment tracking across different experimental modules
 */

import { postToParent, updateState } from "./data-handling.js";

/**
 * Retrieves task-specific bonus data based on the task type
 * @param {string} task - The task identifier ("pilt-to-test", "reversal", "wm", "control", "vigour", "pit")
 * @returns {Object} Object with earned, min, and max bonus values
 */
function getTaskBonusData(task) {
    switch (task) {
        case "pilt-to-test":
            // Combined PILT and vigour/PIT bonus for main experimental condition
            const pilt_bonus = computeRelativePILTBonus();
            const vigour_pit_bonus = computeRelativeVigourPITBonus();
            return {
                earned: pilt_bonus["earned"] + vigour_pit_bonus["earned"],
                min: pilt_bonus["min"] + vigour_pit_bonus["min"],
                max: pilt_bonus["max"] + vigour_pit_bonus["max"]
            };
        case "reversal":
            return computeRelativeReversalBonus();
        case "wm":
            return computeRelativePILTBonus();
        case "control":
            return computeRelativeControlBonus();
        case "vigour": // only for testing vigour module
            return computeRelativeVigourPITBonus();
        case "pit": // only for testing pit module
            return computeRelativeVigourPITBonus();
        default:
            return { earned: 0, min: 0, max: 0 };
    }
}

/**
 * Rounds a numeric value to a specified number of decimal places
 * @param {number} value - The number to round
 * @param {number} digits - Number of decimal places (default: 2)
 * @returns {number} The rounded value
 */
function roundDigits(value, digits = 2) {
    const multiplier = Math.pow(10, digits);
    return Math.round(value * multiplier) / multiplier;
}

/**
 * Creates a deep copy of the session state object
 * @returns {Object} Deep copy of window.session_state
 */
function deepCopySessionState() {
    const base = window.session_state || {};
    const copy = {};
    for (const key in base) {
        copy[key] = { ...base[key] };
    }
    return copy;
}

/**
 * Computes the total bonus payment for the current task
 * Scales performance between minimum and maximum bonus amounts
 * @returns {number} Total bonus amount in GBP
 */

function computeTotalBonus(module) {

    // Maximum bonus amounts for each task type
    const min_bonus = module.max_bonus * module.min_prop_bonus;

    // Initialize cumulative bonus values
    let totalEarned = 0;
    let totalMin = 0;
    let totalMax = 0;

    // Iterate over module elements
    if (module.elements && Array.isArray(module.elements)) {
        for (const element of module.elements) {
            // Check if element is a task
            if (element.type === "task") {
                // Get the task object
                const task = element.__task;
                console.log(element)
                
                // Call the computeBonus function if it exists
                if (task.computeBonus && typeof task.computeBonus === 'function') {
                    const bonusResult = task.computeBonus();
                    
                    // Handle the result (could be 0, object, or array)
                    if (bonusResult && typeof bonusResult === 'object') {
                        totalEarned += bonusResult.earned || 0;
                        totalMin += bonusResult.min || 0;
                        totalMax += bonusResult.max || 0;
                    }
                }
            }
        }
    }

    // Calculate proportion of performance between min and max possible scores
    const prop = Math.max(0, Math.min(1, (totalEarned - totalMin) / (totalMax - totalMin)));
    const totalBonus = prop * (module.max_bonus - min_bonus) + min_bonus;

    // Add insurance to ensure bonus is never below minimum or NaN
    return Number.isNaN(totalBonus) ? min_bonus : totalBonus;
}

/**
 * Updates the session state with current task bonus information
 * Sends updated bonus data to parent window via postMessage
 */

function updateBonusState(settings) {
    // Initialize an updated session state object
    const updated_session_state_obj = deepCopySessionState();

    // Initialize the task-specific object if it doesn't exist
    if (!updated_session_state_obj[settings.task_name]) {
        updated_session_state_obj[settings.task_name] = {
            earned: 0,
            min: 0,
            max: 0
        };
    }
    
    // Get the previous bonus values from session state for this specific task
    const prevBonus = {
        earned: updated_session_state_obj[settings.task_name].earned || 0,
        min: updated_session_state_obj[settings.task_name].min || 0,
        max: updated_session_state_obj[settings.task_name].max || 0
    };
    console.log(`Last saved bonus for ${settings.task_name}:`, prevBonus);

    // Get task-specific bonus data
    const taskBonus = settings.__task.computeBonus() || {earned: 0, min: 0, max: 0};
    
    // Calculate the new bonus values
    const newBonus = {
        earned: prevBonus.earned + taskBonus.earned,
        min: prevBonus.min + taskBonus.min,
        max: prevBonus.max + taskBonus.max
    };

    // Update the task-specific values in the session state
    updated_session_state_obj[settings.task_name].earned = roundDigits(newBonus.earned);
    if (settings.task_name !== "reversal") {
        // For all tasks except reversal, we update the min and max in bonus state
        updated_session_state_obj[settings.task_name].min = roundDigits(newBonus.min);
        updated_session_state_obj[settings.task_name].max = roundDigits(newBonus.max);
    }

    // Send the updated state back to the parent window
    console.log("To-be-updated bonus:", updated_session_state_obj);
    postToParent({
        session_state: JSON.stringify(updated_session_state_obj)
    });
}

/**
 * jsPsych trial configuration for displaying bonus payment information
 * Shows final bonus amount and handles bonus state updates
 */

function bonusTrial(module) {
    return {
        type: jsPsychHtmlButtonResponse,
        css_classes: ['instructions'],
        stimulus: function (trial) {
            // Determine context-appropriate terminology
            let stimulus =  `Congratulations! You are nearly at the end of this module!`      
            const total_bonus = computeTotalBonus(module);
            stimulus += `
                    <p>It is time to reveal your total bonus payment for this module.</p>
                    <p>Altogether, you will earn an extra ${total_bonus.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}.</p>
                `;
            return stimulus;
    },
    choices: ['Continue'],
    data: { trialphase: 'bonus_trial' },
    on_start: () => {
      updateState(`bonus_trial`);
    },
    on_finish: (data) => {
      const bonus = computeTotalBonus(module).toFixed(2);
      
      data.bonus = bonus;

      // Send bonus information to parent window
      postToParent({bonus: bonus});
      
      updateState('bonus_trial_end');
    },
    simulation_options: {
      simulate: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' // Simulate the bonus trial in development mode
    }
  };
}

// Export functions for use in other modules
export {
    getTaskBonusData,
    roundDigits,
    deepCopySessionState,
    computeTotalBonus,
    updateBonusState,
    bonusTrial
};
