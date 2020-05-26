const renderNewEventForm = d => {
  if (!d) {
    d = new Date();
  };

  const newEventFormContainer = document.createElement('div');
  newEventFormContainer.innerHTML = `
    <div id='new-event-container'>
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
}

const renderMonthPage = d => {
  const leftPage = document.querySelector("section[class='left']");
  const rightPage = document.querySelector("section[class='right']");

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
      <td><!-- this is for day stats --></td>
      <td'><!-- this is for listing events --></td>
    `;

    monthTable.appendChild(dayLine);

    dayLine.querySelector("td[class='add-event-dayline']").addEventListener('click', e => {
      const newEventForm = document.getElementById('new-event-form');
      newEventForm['start-day'].value = day;
    });
  });

  leftPage.appendChild(monthTable);
  rightPage.appendChild(renderNewEventForm())
};
