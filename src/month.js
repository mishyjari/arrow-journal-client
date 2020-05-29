const renderMonthPage = d => {

  clearPages();
  renderAboutPage();

  const getDaysInMonth = d => {
    const month = d.getMonth();
    d.setDate(1);

    const days = [];

    while( d.getMonth() === month ){
      days.push(d);
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    }
    return days;
  };

  // const monthTable = document.createElement('table');
   leftPage.innerHTML = `
    <h3>${d.toLocaleDateString('en-US',{month: "long", year: "numeric"})}</h3>
   `;

   const dayList = document.createElement('ul');
   leftPage.appendChild(dayList);

  const days = getDaysInMonth(d);

  days.forEach(day => {
    // const dayLine = document.createElement('tr');
    const dayLine = document.createElement('li');
    dayLine['data-day'] = day;
    dayLine.id = "dayline-" + day.toLocaleDateString();

    dayLine.innerHTML = `
      <span class="add-event-dayline"><strong><i title="Add Event" class="fas fa-plus-square"></i></strong></span>
      <span class="date">${day.getDate()} <strong>${day.toLocaleDateString('en-US', {weekday: 'short'})}</strong></span>
      <span class="daily-content-container">
        <span class="see-more">See More</span>
      </span>
    `;

    //variable height of li's depending on days in month
    const daysInMonth = days.length
    dayLine.style.height = `calc(100% / ${daysInMonth})`;

    // dayLine.innerHTML = `
    //   <td class='add-event-dayline'><strong><i title="Add Event" class="fas fa-plus-square"></i></strong></td>
    //   <td>${day.getDate()} <strong>${day.toLocaleDateString('en-US', {weekday: 'short'})}</strong></td> |
    //   <td id='dayline-${day.toLocaleDateString()}'><!-- this is for listing events --></td>
    // `;
    dayList.appendChild(dayLine);

    dayLine.querySelector("i[title='Add Event']").addEventListener('click', e => {
      document.getElementById('logo-welcome').className = 'hidden'
      // Add Event form
      const newEventForm = document.getElementById('new-event-form');
      document.getElementById('new-event-container').className = 'show'
      newEventForm['start-date'].valueAsDate = day;
      newEventForm['end-date'].valueAsDate = day;
      newEventForm['start-time'].value = '12:00';
      newEventForm['end-time'].value = '13:00';

      // Add Task form
      const newTaskForm = document.getElementById('new-task-form');
      document.getElementById('new-task-container').className = 'show';

      newTaskForm.date.valueAsDate = day;

    });

    getEvents(ev => {
      const start = new Date(ev.start_date).toLocaleDateString()
      const dayLine = document.getElementById(`dayline-${start}`);
      if ( dayLine && start === day.toLocaleDateString() ){
        dayLine.querySelector("span[class='daily-content-container']").prepend(renderEventItem(ev, false,false,true))
      }
    })
  });

  // leftPage.appendChild(monthTable);
  const formsContainer = document.createElement('div')
  formsContainer.className = "form-container"
  rightPage.appendChild(formsContainer)
  renderNewEventForm(formsContainer);
  renderNewTaskForm(formsContainer);
  rightPage.style.position = "relative";

  document.querySelector("strong[class='clickable']").addEventListener('click', e => {
    rightPage.innerHTML = '';
    const newEventForm = document.getElementById('new-event-form');
    newEventForm['start-time'].value = '00:00'
    newEventForm['end-time'].value = '23:59';
    });

    //click listener on all see more buttons
  dayList.addEventListener('click', (e) => {
    if (e.target.className === "see-more") {
      console.log("see more")
    }
  })

};
/*
  monthTable.addEventListener('click', (e) => {

    if (e.target.tagName === "I") {
      const tableRow = e.target.parentNode.parentNode.parentNode
      const dateText = (tableRow.childNodes[3].textContent)
      const dateArr = dateText.split(" ")
      //Date num to pass to form. Might be a better way to do this
      const dateNum = parseInt(dateArr[0])
      console.log(dateNum)
    }
  });
*/
