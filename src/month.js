const renderNewEventForm = d => {
  if (!d) {
    d = new Date();
  };

  const newEventFormContainer = document.createElement('div');
  newEventFormContainer.innerHTML = `
    <div id='new-event-container'>
      <h2>New Event</h2>
      <form id='new-event-form' action='POST'>
        <label for="name">Event Name: </label>
        <input type='text' class='text-field' name='name' placeholder='Event Name'>
        <br />
        <label for="location">Location: </label>
        <input type='text' class='text-field' placeholder='Location (optional)'>
        <br />
        <table id='datetime-picker'>
          <tr>
            <td><label for="start">Start: </label></td>
              <td><input type='time' name='start-time'></td>
              <td><input type="date" name='start-date'></td>
            </tr>
            <tr>
              <td><label for="end">End: </label></td>
              <td><input type='time' name='end-time'></td>
              <td><input type="date" name='end-date'></td>
            <tr>
              <td><input type='checkbox' id='all-day' name='all-day'></td>
              <td><strong>All Day?</strong></td>
            </tr>
        </table>
        <input type="submit" class='btn' value='Add Event'>

      </form>
    </div>
  `;

  // Populate fields with info from date obj

  return newEventFormContainer;
};

const renderMonthPage = d => {
  const leftPage = document.querySelector("section[class='left']");
  leftPage.id = "month-left"
  const rightPage = document.querySelector("section[class='right']");
  rightPage.id = "month-right"

  clearPages();

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

  const monthTable = document.createElement('table');
  const days = getDaysInMonth(d);

  days.forEach(day => {
    const dayLine = document.createElement('tr');
    dayLine['data-day'] = day;

    dayLine.innerHTML = `
      <td class='add-event-dayline'><strong>+</td>
      <td>${day.getDate()} <strong>${day.toLocaleDateString('en-US', {weekday: 'short'})}</strong></td> |
      <td id='dayline-${day.toLocaleDateString()}'><!-- this is for listing events --></td>
    `;
    monthTable.appendChild(dayLine);

    dayLine.querySelector("td[class='add-event-dayline']").addEventListener('click', e => {
      const newEventForm = document.getElementById('new-event-form');
      newEventForm['start-day'].value = day;
    });
  });

  getEvents(ev => {
    const dayLine = document.getElementById(`dayline-${ev.start_date.toLocaleDateString()}`);
    if ( dayLine && ev.start_date.getMonth() === d.getMonth() ){
      dayLine.textContent = ev.name;
    }
  })

  leftPage.appendChild(monthTable);
  rightPage.appendChild(renderNewEventForm())

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

};
