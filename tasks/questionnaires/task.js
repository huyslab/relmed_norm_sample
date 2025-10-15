import { updateState, getResumptionState } from '@utils/index.js';
import * as questionnaires from "./questionnaire_instruments.js"

const questionnaires_instructions = (total) => {
    return [
        {
            type: jsPsychInstructions,
            css_classes: ['instructions'],
            pages: [
                `<p>Please answer the following ${total} questionnaires.</p>` +
                `<p>Each questionnaire will be presented on a separate page.</p>` +
                `<p>Your responses are important, and we ask that you carefully read each question and answer as accurately and thoughtfully as possible.</p>` +
                `<p>Please take your time with each item, and remember that there are no "right" or "wrong" answers. Your honest and thorough responses will help us gather meaningful data.</p>` +
                `<p>Click 'Next' to begin.</p>`
            ],
            show_clickable_nav: true,
            data: {trialphase: "pre_questionnaire_instructions"},
        }
    ];
}

/**
 * Creates a timeline of questionnaires with resumption support
 *
 * @param {Object} settings - Configuration object with questionnaire_list, session, and resumptionRules
 * @returns {Array<Object>} Timeline array of jsPsych trial objects
 *
 * @description
 * - Selects questionnaire list based on session if sessionQuestionnaires is defined
 * - Falls back to questionnaire_list if session not found
 * - Applies resumption logic to skip completed questionnaires
 * - Each questionnaire function is called with (position, total)
 * - Last questionnaire calls updateState("no_resume") to prevent further resumption
 */
export function createQuestionnairesTimeline(settings) {
    // Get resumption state from URL
    const lastState = getResumptionState();
    console.log("Questionnaires resumption - last state:", lastState);

    // Determine questionnaire list based on session
    let questionnaire_list;

    if (settings.session_questionnaires && settings.session) {
        // Use session-specific questionnaire list if available
        questionnaire_list = settings.session_questionnaires[settings.session];

        if (questionnaire_list) {
            console.log(`Using session-specific questionnaires for session "${settings.session}":`, questionnaire_list);
        } else {
            // Session not found in mapping, fall back to default_questionnaires
            console.warn(`No questionnaires defined for session "${settings.session}", using default_questionnaires`);
            questionnaire_list = settings.default_questionnaires || [];
        }
    } else {
        // No session mapping provided, use default_questionnaires directly
        questionnaire_list = settings.default_questionnaires || [];
    }

    // Apply resumption logic if enabled
    if (settings.__task.resumptionRules?.enabled && lastState && lastState !== "none") {
        const lastStartedQuestionnaire = settings.__task.resumptionRules.extractProgress(lastState, settings.__task.resumptionRules.statePattern);

        if (lastStartedQuestionnaire) {
            const lastIndex = questionnaire_list.indexOf(lastStartedQuestionnaire);

            if (lastIndex !== -1) {
                // Skip started questionnaires, start from the next one
                questionnaire_list = questionnaire_list.slice(lastIndex + 1);
                console.log(`Resuming questionnaires from: ${questionnaire_list[0] || 'all complete'}`);
            }
        }
    }

    // If no questionnaires left, return empty timeline
    if (questionnaire_list.length === 0) {
        console.log("All questionnaires completed, skipping");
        return [];
    }

    // Build timeline from questionnaire list
    let questionnaire_timeline = [];
    questionnaire_list.forEach((name, i) => {
        const questionnaire = questionnaires[name];
        if (questionnaire) {
            questionnaire_timeline.push(questionnaire(i + 1, questionnaire_list.length));
        } else {
            console.warn(`Questionnaire "${name}" not found in questionnaire_instruments.js`);
        }
    });

    // Mark last questionnaire as final to prevent resumption
    if (questionnaire_timeline.length > 0) {
        const lastIndex = questionnaire_timeline.length - 1;
        const originalOnStart = questionnaire_timeline[lastIndex].on_start;

        questionnaire_timeline[lastIndex].on_start = () => {
            updateState("no_resume");
            if (originalOnStart) {
                originalOnStart();
            }
        };
    }

    // Prepend instructions
    questionnaire_timeline.unshift(...questionnaires_instructions(questionnaire_list.length));

    return questionnaire_timeline;
}
