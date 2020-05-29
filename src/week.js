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
          <span class="add-btn add-event-btn"><i title="Add Event" class="fas fa-plus-square"></i></span>
        </div>
        <div class="task-cell">
          <ul class="day-cell-list task-list"></ul>
          <span class="add-btn add-task-btn"><i title="Add Task" class="fas fa-plus-square"></i></span>
        </div>
      </div>
    `;
    dayCell.querySelector("span[class='add-btn add-event-btn']").addEventListener("click", e => {
      const page = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.className;
      const opposite = page === 'right' ? leftPage : rightPage;
      opposite.innerHTML = '';
      renderNewEventForm(opposite);

      // Add Event form
      const newEventForm = document.getElementById('new-event-form');
      document.getElementById('new-event-container').className = 'show'
      newEventForm['start-date'].valueAsDate = new Date(e.target.parentNode.parentNode.parentNode.parentNode.id.split('-')[2]);
      newEventForm['end-date'].valueAsDate = new Date(e.target.parentNode.parentNode.parentNode.parentNode.id.split('-')[2]);
      newEventForm['start-time'].value = '12:00'
      newEventForm['end-time'].value = '13:00';
    })
    dayCell.querySelector("span[class='add-btn add-task-btn']").addEventListener("click", e => {

      const page = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.className;
      const opposite = page === 'right' ? leftPage : rightPage;
      opposite.innerHTML = '';
      renderNewTaskForm(opposite);
      // Add Task form
      const newTaskForm = document.getElementById('new-task-form');
      document.getElementById('new-task-container').className = 'show';

      newTaskForm.date.valueAsDate = dateObj;

    })
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
    const start = new Date(event.start_date);
    const cell = document.getElementById(`day-cell-${start.toLocaleDateString()}`);
    if ( cell ){
      const eventLi = document.createElement('li');
      eventLi.appendChild(renderEventItem(event, false,false,true))
      cell.querySelector("ul[class='day-cell-list event-list']").appendChild(eventLi);
    }
  })

  getTasks(task => {
    const date = new Date(task.date);
    const cell = document.getElementById(`day-cell-${date.toLocaleDateString()}`);
    if ( cell ){
      const taskLi = document.createElement('li');
      taskLi.appendChild(renderTaskItem(task))
      cell.querySelector("ul[class='day-cell-list task-list']").appendChild(taskLi);
    }
  });

  // If activeDate has been pushed back to a sunday in the previous month, reset it the 1st to perserve date integrity
  if ( new Date().getMonth() !== activeDate.getMonth() ){
    activeDate.setMonth(new Date().getMonth());
    activeDate.setDate(1)
  }
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
}
