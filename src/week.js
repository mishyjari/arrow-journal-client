const renderWeekPage = d => {

  const leftPage = document.querySelector("section[class='left']");
  leftPage.id = "week-left"
  const rightPage = document.querySelector("section[class='right']");
  rightPage.id = "week-right"

  leftPage.innerHTML = `
    <div class="day-cell">
      <h3>Sunday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <h3>Monday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <h3>Tuesday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <h3>Wednesday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
  `;
  rightPage.innerHTML = `
    <div class="day-cell">
      <h3>Thursday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <h3>Friday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <h3>Saturday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <h3>Sunday</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <h4>Events</h4>
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <h4>Tasks</h4>
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    </div>
  `;
}
