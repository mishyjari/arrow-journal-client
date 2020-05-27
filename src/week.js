const renderWeekPage = d => {

  leftPage.id = "week-left"
  rightPage.id = "week-right"

  leftPage.innerHTML = `
    <div class="day-cell">
      <h3>Sunday</h3>
      <ul class="day-cell-list"></ul>
    </div>
    <div class="day-cell">
      <h3>Monday</h3>
      <ul class="day-cell-list"></ul>
    </div>
    <div class="day-cell">
      <h3>Tuesday</h3>
      <ul class="day-cell-list"></ul>
    </div>
    <div class="day-cell">
      <h3>Wednesday</h3>
      <ul class="day-cell-list"></ul>
    </div>
  `;
  rightPage.innerHTML = `
    <div class="day-cell">
      <h3>Thursday</h3>
      <ul class="day-cell-list"></ul>
    </div>
    <div class="day-cell">
      <h3>Friday</h3>
      <ul class="day-cell-list"></ul>
    </div>
    <div class="day-cell">
      <h3>Saturday</h3>
      <ul class="day-cell-list"></ul>
    </div>
    <div class="day-cell">
      <h3>Sunday</h3>
      <ul class="day-cell-list"></ul>
    </div>
  `;
}
