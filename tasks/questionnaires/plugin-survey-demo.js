var jsPsychSurveyDemo = (function (jspsych) {
  'use strict';

  const info = {
    name: 'survey-demo',
    description: '',
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

      // Inject CSS
      html += `<style>
      .survey-demo-wrap {
        height: 100vh;
        width: 100vw;
      }
      .survey-demo-instructions {
        width: 800px;
        margin: auto;
        font-size: 16px;
        line-height: 1.5em;
        text-align: left;
      }
      .survey-demo-container {
        display: grid;
        grid-template-columns: 40% 60%;
        grid-template-rows: auto;
        width: 800px;
        margin: auto;
        background-color: #F8F8F8;
        border-radius: 8px;
      }
      .survey-demo-row {
        display: contents;
      }
      .survey-demo-row:hover div {
        background-color: #dee8eb;
      }
      .survey-demo-prompt {
        padding: 12px 0 12px 15px;
        text-align: left;
        font-size: 15px;
        line-height: 1.15em;
        justify-items: center;
      }
      .survey-demo-prompt label {
        padding: 0 8px 0 0;
        display: inline-block;
      }
      .survey-demo-response {
        padding: 12px 0 12px 0;
        font-size: 13px;
        text-align: left;
        line-height: 1.15em;
        justify-items: center;
      }
      .survey-demo-response label {
        padding: 0 1em 0 0;
        display: inline-block;
      }
      .survey-demo-response input[type='radio'], input[type='checkbox'] {
        height: 13px;
        width: 13px;
        margin: 0 6px 0 0;
      }
      .survey-demo-response input[type='number'], input[type='text'] {
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .survey-demo-response input[type='number'] {
        width: 40px;
      }
      .survey-demo-response input[type='text'] {
        width: 15%;
      }
      .survey-demo-footer {
        margin: auto;
        width: 800px;
        padding: 0 0 0 0;
        text-align: right;
      }
      .survey-demo-footer input[type=submit] {
        background-color: #F0F0F0;
        padding: 8px 20px;
        border: none;
        border-radius: 4px;
        margin-top: 5px;
        margin-bottom: 20px;
        margin-right: 0px;
        font-size: 13px;
        color: black;
      }
      </style>`;

      // Initialize survey.
      html += '<div class="survey-demo-wrap"><form id="jspsych-survey-demo">';

      // Add demoing header.
      html += '<div class=survey-demo-instructions>';
      html += `<p>${trial.instructions}<p>`;
      html += '</div>';

      // Begin demoing container.
      html += '<div class="survey-demo-container">';

      // Item 1: Age
      html += '<div class="survey-demo-row">';
      html += '<div class="survey-demo-prompt"><label for="age">What is your age?</label></div>';
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

      // Close container.
      html += '</div>';

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

      display_element.querySelector('#jspsych-survey-demo').addEventListener('submit', function (event) {

        // Wait for response
        event.preventDefault();


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
  }
  SurveyDemoPlugin.info = info;

  return SurveyDemoPlugin;

})(jsPsychModule);
