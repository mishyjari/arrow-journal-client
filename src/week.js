const renderWeekPage = d => {
  clearPages();
  createWeekHeaders();

  // Start by taking the date passed in and setting it to the Sunday beggining that week
  d.setDate(d.getDate() - d.getDay());

  // And get an array of dates for that week
  const week = [];
  while ( week.length < 7 ){
    week.push(d)
    d = new Date(d)
    d.setDate(d.getDate() + 1)
  };
  // This is the function we will use to create each day cell
  const createDayCell = dateObj => {
    const dayCell = document.createElement('div');
    dayCell.className = 'day-cell';
    dayCell.id = 'day-cell-' + dateObj.toLocaleDateString();
    dayCell.innerHTML = `
      <h3>${dateObj.toDateString()}</h3>
      <div class="day-inner-container">
        <div class="event-cell">
          <ul class="day-cell-list event-list"></ul>
        </div>
        <div class="task-cell">
          <ul class="day-cell-list task-list"></ul>
        </div>
      </div>
    `;
    return dayCell;
  };

  // Populate left page
  while ( week.length > 3 ){
    leftPage.appendChild(
      createDayCell(week.shift())
  )}
  // And right page
  while ( week.length > 0 ){
    rightPage.appendChild(
      createDayCell(week.shift())
  )}

  // Will need to fetch and populate.
  // This isn't working yet. Besides, I'd rather query the DB more selectively.
  getEvents(event => {
    const cell = document.getElementById('day-cell' + event.start_date)
    if ( cell ){
      const eventLi = document.createElement('li');
      eventLi.textContent = event.name;
      cell.querySelector("ul[class='event-list']").appendChild(eventLi);
    }
  })

  // We will need one for the next week preview too, but I'm not sure exactly what functionality it should have yet

};

const createWeekHeaders = () => {
  const headerContainerLeft = document.createElement('div');
  headerContainerLeft.className = "header-l";
  headerContainerLeft.innerHTML = `
    <h2>Events</h2>
    <h2>Tasks</h2>
  `;
  
  const headerContainerRight = document.createElement('div');
  headerContainerRight.className = "header-r";
  headerContainerRight.innerHTML = `
    <h2>Events</h2>
    <h2>Tasks</h2>
  `;


  leftPage.prepend(headerContainerLeft);
  rightPage.prepend(headerContainerRight);

  // const taskHeader = document.createElement('h2');
  // taskHeader.textContent = 'Tasks';
  // leftPage.prepend(taskHeader);
  // rightPage.prepend(taskHeader);
}

/*
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
*/
