var jsPsychSurveyDemo = (function (jspsych) {
  'use strict';

  const info = {
    name: 'survey-demo',
    description: '',
    version: '1.2.0',
    parameters: {
      button_label: {
        type: jspsych.ParameterTypeSTRING,
        pretty_name: 'Button label',
        default: 'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
      instructions: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: 'Instructions',
        description: 'The instructions associated with the survey'
      },
      body: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: 'Body',
        default: null,
        description: 'The HTML content of the survey body'
      }
    },
    data: {
      responses: {
            type: jspsych.ParameterType.OBJECT,
            pretty_name: "Participant responses"
      },
      rt: {
          type: jspsych.ParameterType.FLOAT,
          pretty_name: "Overall response times"
      },
    }
  }

  /**
  * jspsych-survey-demo
  * a jspsych plugin for RELMED demographics form
  * adapted from Niv lab's jspsych-survey-demo plugin originally by Sam Zorowitz
  */
  class SurveyDemoPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {

      //---------------------------------------//
      // Define HTML.
      //---------------------------------------//

      // Initialize HTML
      var html = '';

      // Initialize survey.
      html += '<div class="survey-demo-wrap"><form id="jspsych-survey-demo">';

      // Add demoing header.
      html += '<div class=survey-demo-instructions>';
      html += `<p>${trial.instructions}<p>`;
      html += '</div>';

      // Begin demoing container.
      html += '<div class="survey-demo-container">';

      if (trial.body !== null) {
        // Load external HTML file.
        html += trial.body;
      } else {
        // Item 1: Age
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="age">Age</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<input type="number" name="age" min="18" max="100" size="20" required>';
        html += '</div></div>';

        // Item 2: Sex
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="sex">Sex assigned at birth</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<label><input type="radio" name="sex" value="Female" required>Female</label><br>';
        html += '<label><input type="radio" name="sex" value="Male" required>Male</label><br>';
        html += '</div></div>';

        // Item 3: Gender
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="gender">Gender</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<label><input type="radio" name="gender" value="Female" required>Female</label><br>';
        html += '<label><input type="radio" name="gender" value="Male" required>Male</label><br>';
        html += '<label><input type="radio" name="gender" value="Trans-female" required>Trans-female</label><br>';
        html += '<label><input type="radio" name="gender" value="Trans-male" required>Trans-male</label><br>';
        html += '<label><input type="radio" name="gender" value="Non-binary" required>Non-binary</label><br>';
        html += '<label style="padding: 0 0.5em 0 0;"><input type="radio" name="gender" value="Other" required>Other</label>';
        html += '<input type="text" name="gender-free-response" maxlength="24" size="10"></label><br>';
        html += '</div></div>';

        // Item 4: Education
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="education">What is the highest level of education?</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<label><input type="radio" name="education" value="No Education" required>No Education</label><br>';
        html += '<label><input type="radio" name="education" value="Primary" required>Primary</label><br>';
        html += '<label><input type="radio" name="education" value="Secondary" required>Secondary (e.g. O level, GCSE)</label><br>';
        html += '<label><input type="radio" name="education" value="Further" required>Further (e.g. A level, BTEC, NVQ)</label><br>';
        html += '<label><input type="radio" name="education" value="Degree" required>Degree</label><br>';
        html += '<label><input type="radio" name="education" value="Postgraduate" required>Postgraduate</label><br>';
        html += '<label style="padding: 0 0.5em 0 0;"><input type="radio" name="education" value="Other" required>Other, please specify</label>';
        html += '<input type="text" name="education-other" maxlength="50" size="20"></label><br>';
        html += '<label><input type="radio" name="education" value="Unable to specify" required>Unable to specify</label><br>';
        html += '<label><input type="radio" name="education" value="Prefer not to say" required>Prefer not to say</label>';
        html += '</div></div>';

        // Item 5: Employment Status
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="employment">What is your current employment status?</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<label><input type="radio" name="employment" value="Full time employment" required>Full time employment</label><br>';
        html += '<label><input type="radio" name="employment" value="Part time employment" required>Part time employment</label><br>';
        html += '<label><input type="radio" name="employment" value="Retired" required>Retired</label><br>';
        html += '<label><input type="radio" name="employment" value="Unemployed/unable to work" required>Unemployed/unable to work</label><br>';
        html += '<label><input type="radio" name="employment" value="In full-time education" required>In full-time education</label><br>';
        html += '<label><input type="radio" name="employment" value="In part-time education" required>In part-time education</label><br>';
        html += '<label style="padding: 0 0.5em 0 0;"><input type="radio" name="employment" value="Other" required>Other, please specify</label>';
        html += '<input type="text" name="employment-other" maxlength="50" size="20"></label><br>';
        html += '<label><input type="radio" name="employment" value="Unable to specify" required>Unable to specify</label><br>';
        html += '<label><input type="radio" name="employment" value="Prefer not to say" required>Prefer not to say</label>';
        html += '</div></div>';

        // Item 6: Financial Management
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="financial">How well do you feel that you are managing financially these days?</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<label><input type="radio" name="financial" value="Living comfortably" required>Living comfortably</label><br>';
        html += '<label><input type="radio" name="financial" value="Doing alright" required>Doing alright</label><br>';
        html += '<label><input type="radio" name="financial" value="Just about getting by" required>Just about getting by</label><br>';
        html += '<label><input type="radio" name="financial" value="Finding it difficult to make ends meet" required>Finding it difficult to make ends meet</label><br>';
        html += '<label><input type="radio" name="financial" value="Finding it very difficult to make ends meet" required>Finding it very difficult to make ends meet</label><br>';
        html += '<label><input type="radio" name="financial" value="Prefer not to say" required>Prefer not to say</label>';
        html += '</div></div>';

        // Item 7: Personal Income
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="income">Which of the following best describes your personal income last year?</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<label><input type="radio" name="income" value="£0" required>£0</label><br>';
        html += '<label><input type="radio" name="income" value="£1 to £9,999" required>£1 to £9,999</label><br>';
        html += '<label><input type="radio" name="income" value="£10,000 to £24,999" required>£10,000 to £24,999</label><br>';
        html += '<label><input type="radio" name="income" value="£25,000 to £49,999" required>£25,000 to £49,999</label><br>';
        html += '<label><input type="radio" name="income" value="£50,000 to £74,999" required>£50,000 to £74,999</label><br>';
        html += '<label><input type="radio" name="income" value="£75,000 to £99,999" required>£75,000 to £99,999</label><br>';
        html += '<label><input type="radio" name="income" value="£100,000 or more" required>£100,000 or more</label><br>';
        html += '<label><input type="radio" name="income" value="Prefer not to say" required>Prefer not to say</label>';
        html += '</div></div>';

        // Item 8: Menstrual Cycle - First Day of Last Period
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="menstrual-first-day">When was the first day of your last menstrual bleeding (period)?</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<input type="date" name="menstrual-first-day"><br>';
        html += '<label><input type="radio" name="menstrual-first-day-option" value="Don\'t know" required>Don\'t know</label><br>';
        html += '<label><input type="radio" name="menstrual-first-day-option" value="Not applicable (Not WOCBP)" required>Not applicable (Not WOCBP)</label><br>';
        html += '<span style="font-size: 12px; font-style: italic; color: #666;">*WOCBP = Women of childbearing potential</span>';
        html += '</div></div>';

        // Item 9: Menstrual Cycle - Typical Length
        html += '<div class="survey-demo-row">';
        html += '<div class="survey-demo-prompt"><label for="menstrual-cycle-length">What is the typical number of days between the start of one menstrual bleeding and the start of the next month?</label></div>';
        html += '<div class="survey-demo-response">';
        html += '<input type="number" name="menstrual-cycle-length" min="1" max="100" size="10"> days<br>';
        html += '<label><input type="radio" name="menstrual-cycle-length-option" value="Don\'t know" required>Don\'t know</label><br>';
        html += '<label><input type="radio" name="menstrual-cycle-length-option" value="Not applicable (Not WOCBP)" required>Not applicable (Not WOCBP)</label><br>';
        html += '<span style="font-size: 12px; font-style: italic; color: #666;">*WOCBP = Women of childbearing potential</span>';
        html += '</div></div>';
      }

      // Close container.
      html += '</div>';

      // Add error message container
      html += '<div id="validation-error"></div>';

      // Add submit button.
      html += '<div class="survey-demo-footer">';
      html += `<input type="submit" value="${trial.button_label}"></input>`;
      html += '</div>';

      // End survey.
      html += '</form></div>';

      // Display HTML
      display_element.innerHTML = html;

      //---------------------------------------//
      // Define functions.
      //---------------------------------------//

      // Scroll to top of screen.
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }

      // Add mutual exclusion logic for grouped fields
      const setupMutualExclusion = function() {
        const groups = {};

        // Collect all fields by their data-group attribute
        const groupedFields = display_element.querySelectorAll('[data-group]');
        groupedFields.forEach(field => {
          const group = field.getAttribute('data-group');
          if (!groups[group]) {
            groups[group] = [];
          }
          groups[group].push(field);
        });

        // Set up event listeners for each group
        Object.keys(groups).forEach(groupName => {
          const fields = groups[groupName];

          // Find the primary input (date or number) and radio options
          const primaryInput = fields.find(f => f.type === 'date' || f.type === 'number');
          const radioInputs = fields.filter(f => f.type === 'radio');

          if (primaryInput && radioInputs.length > 0) {
            // When primary input (date/number) is filled, clear radio selection
            // Use both 'input' and 'change' events for better Safari compatibility
            const clearRadios = function() {
              if (this.value && this.value.trim() !== '') {
                radioInputs.forEach(radio => {
                  radio.checked = false;
                });
              }
            };
            primaryInput.addEventListener('input', clearRadios);
            primaryInput.addEventListener('change', clearRadios);
            // Also handle blur for Safari
            primaryInput.addEventListener('blur', clearRadios);

            // When any radio is selected, clear the primary input
            radioInputs.forEach(radio => {
              radio.addEventListener('click', function() {
                // Use setTimeout to ensure the click completes first in Safari
                setTimeout(() => {
                  if (this.checked) {
                    primaryInput.value = '';
                  }
                }, 0);
              });

              radio.addEventListener('change', function() {
                if (this.checked) {
                  primaryInput.value = '';
                }
              });
            });
          }
        });
      };

      // Initialize mutual exclusion
      setupMutualExclusion();

      display_element.querySelector('#jspsych-survey-demo').addEventListener('submit', function (event) {

        // Wait for response
        event.preventDefault();

        // Custom validation for mutually exclusive fields (date/number vs radio)
        const validateMutuallyExclusiveGroups = function() {
          const groups = {};
          const errorMessageEl = display_element.querySelector('#validation-error');

          // Hide any previous error messages and remove highlights
          errorMessageEl.style.display = 'none';
          errorMessageEl.textContent = '';

          // Remove previous error highlights from prompt and response divs
          display_element.querySelectorAll('.survey-demo-prompt, .survey-demo-response').forEach(el => {
            el.style.backgroundColor = '';
            el.style.border = '';
            el.style.outline = '';
          });

          // Collect all fields by their data-group attribute
          const groupedFields = display_element.querySelectorAll('[data-group]');
          groupedFields.forEach(field => {
            const group = field.getAttribute('data-group');
            if (!groups[group]) {
              groups[group] = [];
            }
            groups[group].push(field);
          });

          // Validate each group
          for (const groupName in groups) {
            const fields = groups[groupName];
            let hasValue = false;

            for (const field of fields) {
              if (field.type === 'radio') {
                if (field.checked) {
                  hasValue = true;
                  break;
                }
              } else if (field.type === 'date' || field.type === 'number') {
                if (field.value && field.value.trim() !== '') {
                  hasValue = true;
                  break;
                }
              }
            }

            if (!hasValue) {
              // Find the label text for better error message
              const row = fields[0].closest('.survey-demo-row');
              const promptText = row ? row.querySelector('.survey-demo-prompt label')?.textContent : 'this question';

              // Highlight the question prompt and response divs with red border
              if (row) {
                const promptDiv = row.querySelector('.survey-demo-prompt');
                const responseDiv = row.querySelector('.survey-demo-response');

                if (promptDiv) {
                  promptDiv.style.backgroundColor = '#fde9e9';
                }
                if (responseDiv) {
                  responseDiv.style.backgroundColor = '#fde9e9';
                }
              }

              // Display inline error message
              errorMessageEl.textContent = 'Please answer: ' + promptText.trim();
              errorMessageEl.style.display = 'block';

              // Scroll to the highlighted question
              const scrollTarget = row?.querySelector('.survey-demo-prompt') || errorMessageEl;
              scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });

              return false;
            }
          }

          return true;
        };

        // Run custom validation
        if (!validateMutuallyExclusiveGroups()) {
          return; // Stop form submission if validation fails
        }

        // Measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;

        var question_data = serializeArray(this);
        question_data = objectifyForm(question_data);

        // Store data
        var trialdata = {
          "rt": response_time,
          "responses": question_data
        };

        // Update screen
        display_element.innerHTML = '';

        // Move onto next trial
        jsPsych.finishTrial(trialdata);

      });

      var startTime = performance.now();

      /*!
      * Serialize all form data into an array
      * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
      * @param  {Node}   form The form to serialize
      * @return {String}      The serialized form data
      */
      var serializeArray = function (form) {
        // Setup our serialized data
        var serialized = [];

        // Loop through each field in the form
        for (var i = 0; i < form.elements.length; i++) {
          var field = form.elements[i];

          // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
          if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

          // If a multi-select, get all selections
          if (field.type === 'select-multiple') {
            for (var n = 0; n < field.options.length; n++) {
              if (!field.options[n].selected) continue;
              serialized.push({
                name: field.name,
                value: field.options[n].value
              });
            }
          }

          // Convert field data to a query string
          else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized.push({
              name: field.name,
              value: field.value
            });
          }
        }

        // add checkbox responses
        var checkbox_types = document.querySelectorAll('input[type=checkbox]');
        var checkbox_names = [];
        for (var i = 0; i < checkbox_types.length; i++) {
          if (!checkbox_names.includes(checkbox_types[i].name)) {
            checkbox_names.push(checkbox_types[i].name)
          }
        }

        for (var i = 0; i < checkbox_names.length; i++) {
          var checkboxes = document.querySelectorAll(`input[name=${checkbox_names[i]}]:checked`)
          var responses = [];

          for (var j = 0; j < checkboxes.length; j++) {
            responses.push(checkboxes[j].value)
          }
          serialized.push({
            name: checkbox_names[i],
            value: responses
          })

        }

        return serialized;
      };

      // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
      function objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
      }

    }

    // Simulation method
    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
          load_callback();
          this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == "visual") {
          this.simulate_visual(trial, simulation_options, load_callback);
      }
    }

    create_simulation_data(trial, simulation_options) {
      const responses = {};

      // Generate simulated responses based on the form fields
      if (trial.body !== null) {
        // Parse the custom HTML body to extract form fields
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = trial.body;

        // Extract all input fields
        const inputs = tempDiv.querySelectorAll('input, select, textarea');
        const processedRadioGroups = new Set();
        const processedMutualGroups = new Set();

        // Group fields by data-group attribute for mutually exclusive validation
        const mutualGroups = {};
        inputs.forEach(input => {
          const group = input.getAttribute('data-group');
          if (group) {
            if (!mutualGroups[group]) {
              mutualGroups[group] = [];
            }
            mutualGroups[group].push(input);
          }
        });

        // Process mutually exclusive groups first
        Object.keys(mutualGroups).forEach(groupName => {
          const groupFields = mutualGroups[groupName];

          // Find the primary input (date or number) and radio options
          const primaryInput = groupFields.find(f => f.type === 'date' || f.type === 'number');
          const radioInputs = groupFields.filter(f => f.type === 'radio');

          if (primaryInput && radioInputs.length > 0) {
            // Randomly decide to fill either primary input or radio option
            const usePrimaryInput = this.jsPsych.randomization.sampleWithReplacement([true, false], 1)[0];

            if (usePrimaryInput) {
              // Fill the date or number input
              const name = primaryInput.getAttribute('name');
              if (primaryInput.type === 'number') {
                const min = parseInt(primaryInput.getAttribute('min')) || 0;
                const max = parseInt(primaryInput.getAttribute('max')) || 100;
                responses[name] = this.jsPsych.randomization.randomInt(min, max);
              } else if (primaryInput.type === 'date') {
                const date = new Date();
                date.setDate(date.getDate() - this.jsPsych.randomization.randomInt(1, 60));
                responses[name] = date.toISOString().split('T')[0];
              }
              processedMutualGroups.add(primaryInput.getAttribute('name'));
            } else {
              // Fill one of the radio options
              const radioName = radioInputs[0].getAttribute('name');
              const values = radioInputs.map(r => r.value).filter(v => v);
              if (values.length > 0) {
                responses[radioName] = this.jsPsych.randomization.sampleWithoutReplacement(values, 1)[0];
              }
              processedRadioGroups.add(radioName);
            }
          }
        });

        inputs.forEach(input => {
          const name = input.getAttribute('name');
          if (!name) return;

          // Skip if already processed as part of a mutual group
          if (processedMutualGroups.has(name)) return;

          const type = input.type || input.tagName.toLowerCase();

          // Handle radio buttons (only process each group once)
          if (type === 'radio') {
            if (processedRadioGroups.has(name)) return;
            processedRadioGroups.add(name);

            // Get all radio options for this name
            const radioOptions = tempDiv.querySelectorAll(`input[name="${name}"]`);
            const values = Array.from(radioOptions).map(r => r.value).filter(v => v);

            if (values.length > 0) {
              responses[name] = this.jsPsych.randomization.sampleWithoutReplacement(values, 1)[0];

              // Check if "Other" option has associated text input
              if (responses[name] === 'Other') {
                const otherInput = tempDiv.querySelector(`input[name="${name}-other"]`);
                if (otherInput) {
                  responses[`${name}-other`] = 'simulated response';
                }
              }
            }
          }
          // Handle checkboxes
          else if (type === 'checkbox') {
            if (!responses[name]) {
              responses[name] = [];
            }
            // Randomly decide to check this box
            if (this.jsPsych.randomization.sampleWithReplacement([true, false], 1)[0]) {
              responses[name].push(input.value || 'checked');
            }
          }
          // Handle number inputs (that aren't part of mutual groups)
          else if (type === 'number' && !input.getAttribute('data-group')) {
            const min = parseInt(input.getAttribute('min')) || 0;
            const max = parseInt(input.getAttribute('max')) || 100;
            responses[name] = this.jsPsych.randomization.randomInt(min, max);
          }
          // Handle date inputs (that aren't part of mutual groups)
          else if (type === 'date' && !input.getAttribute('data-group')) {
            // Generate a date within the past 60 days
            const date = new Date();
            date.setDate(date.getDate() - this.jsPsych.randomization.randomInt(1, 60));
            responses[name] = date.toISOString().split('T')[0];
          }
          // Handle text inputs and textareas
          else if (type === 'text' || type === 'textarea') {
            // Skip if it's an "other" field that will be handled with radio
            if (!name.endsWith('-other') && !name.includes('free-response')) {
              responses[name] = 'simulated text response';
            }
          }
          // Handle select dropdowns
          else if (type === 'select' || input.tagName.toLowerCase() === 'select') {
            const options = Array.from(input.querySelectorAll('option')).map(o => o.value).filter(v => v);
            if (options.length > 0) {
              responses[name] = this.jsPsych.randomization.sampleWithoutReplacement(options, 1)[0];
            }
          }
        });

        // Clean up empty checkbox arrays
        Object.keys(responses).forEach(key => {
          if (Array.isArray(responses[key]) && responses[key].length === 0) {
            delete responses[key];
          }
        });
      } else {
        // Simulate default demographics form responses
        responses.age = this.jsPsych.randomization.randomInt(18, 100);
        responses.sex = this.jsPsych.randomization.sampleWithoutReplacement(['Female', 'Male'], 1)[0];
        responses.gender = this.jsPsych.randomization.sampleWithoutReplacement(['Female', 'Male', 'Trans-female', 'Trans-male', 'Non-binary', 'Other'], 1)[0];
        if (responses.gender === 'Other') {
          responses['gender-free-response'] = 'simulated response';
        }
        responses.education = this.jsPsych.randomization.sampleWithoutReplacement(['No Education', 'Primary', 'Secondary', 'Further', 'Degree', 'Postgraduate', 'Other', 'Unable to specify', 'Prefer not to say'], 1)[0];
        if (responses.education === 'Other') {
          responses['education-other'] = 'simulated education';
        }
        responses.employment = this.jsPsych.randomization.sampleWithoutReplacement(['Full time employment', 'Part time employment', 'Retired', 'Unemployed/unable to work', 'In full-time education', 'In part-time education', 'Other', 'Unable to specify', 'Prefer not to say'], 1)[0];
        if (responses.employment === 'Other') {
          responses['employment-other'] = 'simulated employment';
        }
        responses.financial = this.jsPsych.randomization.sampleWithoutReplacement(['Living comfortably', 'Doing alright', 'Just about getting by', 'Finding it difficult to make ends meet', 'Finding it very difficult to make ends meet', 'Prefer not to say'], 1)[0];
        responses.income = this.jsPsych.randomization.sampleWithoutReplacement(['£0', '£1 to £9,999', '£10,000 to £24,999', '£25,000 to £49,999', '£50,000 to £74,999', '£75,000 to £99,999', '£100,000 or more', 'Prefer not to say'], 1)[0];

        // Menstrual cycle questions - randomly decide if applicable
        const menstrualApplicable = this.jsPsych.randomization.sampleWithReplacement([true, false], 1)[0];
        if (menstrualApplicable) {
          // Generate a date in the past month
          const date = new Date();
          date.setDate(date.getDate() - this.jsPsych.randomization.randomInt(1, 28));
          responses['menstrual-first-day'] = date.toISOString().split('T')[0];
          responses['menstrual-cycle-length'] = this.jsPsych.randomization.randomInt(21, 35);
        } else {
          responses['menstrual-first-day-option'] = "Not applicable (Not WOCBP)";
          responses['menstrual-cycle-length-option'] = "Not applicable (Not WOCBP)";
        }
      }

      const rt = this.jsPsych.randomization.sampleExGaussian(5000, 1000, 1 / 2000, true);

      const default_data = {
        responses: responses,
        rt: rt
      };

      const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
      this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
      return data;
    }

    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options);
      this.jsPsych.finishTrial(data);
    }

    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options);
      const display_element = this.jsPsych.getDisplayElement();
      this.trial(display_element, trial);
      load_callback();

      // Simulate filling out the form
      const form = display_element.querySelector('#jspsych-survey-demo');
      const responses = data.responses;

      // Function to set form field values with delays
      const setFieldWithDelay = (name, value, delay) => {
        const field = form.querySelector(`[name="${name}"]`);
          if (field) {
            if (field.type === 'radio') {
              const radioButton = form.querySelector(`input[name="${name}"][value="${value}"]`);
              if (radioButton) {
                this.jsPsych.pluginAPI.clickTarget(radioButton, delay);
              }
            } else if (field.type === 'number' || field.type === 'text' || field.type === 'date') {
              field.value = value;
            }
          }
      };

      // Set all fields with progressive delays
      let delay = 0;
      const delayIncrement = data.rt / (Object.keys(responses).length);

      for (const [name, value] of Object.entries(responses)) {
        delay += delayIncrement;
        setFieldWithDelay(name, value, delay);
      }

      // Submit the form
      this.jsPsych.pluginAPI.clickTarget(
        form.querySelector('input[type="submit"]'),
        data.rt
      );
    }


  }
  SurveyDemoPlugin.info = info;

  return SurveyDemoPlugin;

})(jsPsychModule);
