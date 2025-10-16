export const demographics_html = `
<!-- Item 1: Age -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="age">Age</label></div>
  <div class="survey-demo-response">
    <input type="number" name="age" min="18" max="100" size="20" required>
  </div>
</div>

<!-- Item 2: Sex -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="sex">Sex assigned at birth</label></div>
  <div class="survey-demo-response">
    <label><input type="radio" name="sex" value="Female" required>Female</label><br>
    <label><input type="radio" name="sex" value="Male" required>Male</label><br>
  </div>
</div>

<!-- Item 3: Gender -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="gender">Gender</label></div>
  <div class="survey-demo-response">
    <label><input type="radio" name="gender" value="Female" required>Female</label><br>
    <label><input type="radio" name="gender" value="Male" required>Male</label><br>
    <label><input type="radio" name="gender" value="Trans-female" required>Trans-female</label><br>
    <label><input type="radio" name="gender" value="Trans-male" required>Trans-male</label><br>
    <label><input type="radio" name="gender" value="Non-binary" required>Non-binary</label><br>
    <label style="padding: 0 0.5em 0 0;"><input type="radio" name="gender" value="Other" required>Other</label>
    <input type="text" name="gender-free-response" maxlength="24" size="10"></label><br>
  </div>
</div>

<!-- Item 4: Education -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="education">What is the highest level of education?</label></div>
  <div class="survey-demo-response">
    <label><input type="radio" name="education" value="No Education" required>No Education</label><br>
    <label><input type="radio" name="education" value="Primary" required>Primary</label><br>
    <label><input type="radio" name="education" value="Secondary" required>Secondary (e.g. O level, GCSE)</label><br>
    <label><input type="radio" name="education" value="Further" required>Further (e.g. A level, BTEC, NVQ)</label><br>
    <label><input type="radio" name="education" value="Degree" required>Degree</label><br>
    <label><input type="radio" name="education" value="Postgraduate" required>Postgraduate</label><br>
    <label style="padding: 0 0.5em 0 0;"><input type="radio" name="education" value="Other" required>Other, please
      specify</label>
    <input type="text" name="education-other" maxlength="50" size="20"></label><br>
    <label><input type="radio" name="education" value="Unable to specify" required>Unable to specify</label><br>
    <label><input type="radio" name="education" value="Prefer not to say" required>Prefer not to say</label>
  </div>
</div>

<!-- Item 5: Employment Status -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="employment">What is your current employment status?</label></div>
  <div class="survey-demo-response">
    <label><input type="radio" name="employment" value="Full time employment" required>Full time employment</label><br>
    <label><input type="radio" name="employment" value="Part time employment" required>Part time employment</label><br>
    <label><input type="radio" name="employment" value="Retired" required>Retired</label><br>
    <label><input type="radio" name="employment" value="Unemployed/unable to work" required>Unemployed/unable to
      work</label><br>
    <label><input type="radio" name="employment" value="In full-time education" required>In full-time
      education</label><br>
    <label><input type="radio" name="employment" value="In part-time education" required>In part-time
      education</label><br>
    <label style="padding: 0 0.5em 0 0;"><input type="radio" name="employment" value="Other" required>Other, please
      specify</label>
    <input type="text" name="employment-other" maxlength="50" size="20"></label><br>
    <label><input type="radio" name="employment" value="Unable to specify" required>Unable to specify</label><br>
    <label><input type="radio" name="employment" value="Prefer not to say" required>Prefer not to say</label>
  </div>
</div>

<!-- Item 6: Financial Management -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="financial">How well do you feel that you are managing financially these
      days?</label></div>
  <div class="survey-demo-response">
    <label><input type="radio" name="financial" value="Living comfortably" required>Living comfortably</label><br>
    <label><input type="radio" name="financial" value="Doing alright" required>Doing alright</label><br>
    <label><input type="radio" name="financial" value="Just about getting by" required>Just about getting by</label><br>
    <label><input type="radio" name="financial" value="Finding it difficult to make ends meet" required>Finding it
      difficult to make ends meet</label><br>
    <label><input type="radio" name="financial" value="Finding it very difficult to make ends meet" required>Finding it
      very difficult to make ends meet</label><br>
    <label><input type="radio" name="financial" value="Prefer not to say" required>Prefer not to say</label>
  </div>
</div>

<!-- Item 7: Personal Income -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="income">Which of the following best describes your personal income last
      year?</label></div>
  <div class="survey-demo-response">
    <label><input type="radio" name="income" value="£0" required>£0</label><br>
    <label><input type="radio" name="income" value="£1 to £9,999" required>£1 to £9,999</label><br>
    <label><input type="radio" name="income" value="£10,000 to £24,999" required>£10,000 to £24,999</label><br>
    <label><input type="radio" name="income" value="£25,000 to £49,999" required>£25,000 to £49,999</label><br>
    <label><input type="radio" name="income" value="£50,000 to £74,999" required>£50,000 to £74,999</label><br>
    <label><input type="radio" name="income" value="£75,000 to £99,999" required>£75,000 to £99,999</label><br>
    <label><input type="radio" name="income" value="£100,000 or more" required>£100,000 or more</label><br>
    <label><input type="radio" name="income" value="Prefer not to say" required>Prefer not to say</label>
  </div>
</div>

<!-- Item 8: Menstrual Cycle - First Day of Last Period -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="menstrual-first-day">When was the first day of your last menstrual
      bleeding (period)?</label></div>
  <div class="survey-demo-response">
    <input type="date" name="menstrual-first-day"><br>
    <label><input type="radio" name="menstrual-first-day-option" value="Don't know" required>Don't know</label><br>
    <label><input type="radio" name="menstrual-first-day-option" value="Not applicable (Not WOCBP)" required>Not
      applicable (Not WOCBP)</label><br>
    <span style="font-size: 12px; font-style: italic; color: #666;">*WOCBP = Women of childbearing potential</span>
  </div>
</div>

<!-- Item 9: Menstrual Cycle - Typical Length -->
<div class="survey-demo-row">
  <div class="survey-demo-prompt"><label for="menstrual-cycle-length">What is the typical number of days between the
      start of one menstrual bleeding and the start of the next month?</label></div>
  <div class="survey-demo-response">
    <input type="number" name="menstrual-cycle-length" min="1" max="100" size="10"> days<br>
    <label><input type="radio" name="menstrual-cycle-length-option" value="Don't know" required>Don't know</label><br>
    <label><input type="radio" name="menstrual-cycle-length-option" value="Not applicable (Not WOCBP)" required>Not
      applicable (Not WOCBP)</label><br>
    <span style="font-size: 12px; font-style: italic; color: #666;">*WOCBP = Women of childbearing potential</span>
  </div>
</div>
`;