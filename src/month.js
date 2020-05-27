

const renderMonthPage = d => {
  clearPages();

  leftPage.id = "month-left"
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

  monthTable.innerHTML = `
    <tr>
      <th></th>
      <th><h3>${d.toLocaleDateString('en-US',{month: "long", year: "numeric"})}</h3></th>
    </tr>
  `;

  const days = getDaysInMonth(d);

  days.forEach(day => {
    const dayLine = document.createElement('tr');
    dayLine['data-day'] = day;

    dayLine.innerHTML = `
      <td class='add-event-dayline'><strong><i title="Add Event" class="fas fa-plus-square"></i></td>
      <td>${day.getDate()} <strong>${day.toLocaleDateString('en-US', {weekday: 'short'})}</strong></td> |
      <td id='dayline-${day.toLocaleDateString()}'><!-- this is for listing events --></td>
    `;
    monthTable.appendChild(dayLine);

    dayLine.querySelector("i[title='Add Event']").addEventListener('click', e => {
      const newEventForm = document.getElementById('new-event-form');
      console.log(day)
      document.getElementById('new-event-container').className = 'show'
      newEventForm['start-date'].valueAsDate = day;
      newEventForm['end-date'].valueAsDate = day;
      newEventForm['start-time'].value = '12:00'
      newEventForm['end-time'].value = '13:00';
    });

    getEvents(ev => {
      const dayLine = document.getElementById(`dayline-${ev.start_date.toLocaleDateString()}`);
      if ( dayLine && ev.start_date.getMonth() === d.getMonth() ){
        dayLine.textContent += ev.name;
      }
    })
  });

  leftPage.appendChild(monthTable);
  renderNewEventForm(rightPage);

  document.querySelector("strong[class='clickable']").addEventListener('click', e => {
    const newEventForm = document.getElementById('new-event-form');
    newEventForm['start-time'].value = '00:00'
    newEventForm['end-time'].value = '23:59';
    });
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
