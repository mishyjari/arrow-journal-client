class Event {
  constructor(params){
    this.name = params.name
    this.start_date = params.start_date
    this.end_date = params.end_date
    this.location = params.location
  }
}

// Will fetch all events, takes a function as an argument to dictate what to do with response.
// This should be updated to fetch all of a given journal's events, rather than the whole shebang!
const getEvents = method => {
    const events = getActiveUserJournal().events;
    events.forEach(event => {
      method(event)
    });
    checkOverflow()
}

// Attaches new event form to parentNode arg. Degaults to hidden.
const renderNewEventForm = parentNode => {
  const newEventFormContainer = document.createElement('div');
  // newEventFormContainer.className = "form-container";
  newEventFormContainer.innerHTML = `
    <div id='new-event-container' class='hidden'>
      <h2>New Event</h2>
      <form id='new-event-form' action='#'>
        <label for="name">Event Name: </label>
        <input type='text' class='text-field' name='name' placeholder='Event Name'>
        <br />
        <label for="location">Location: </label>
        <input type='text' class='text-field' name='location' placeholder='Location (optional)'>
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
              <td><strong class='clickable'>All Day?</strong></td>
            </tr>
        </table>
        <input type="submit" class='btn' value='Add Event'>
        <h6 class='clickable'>cancel</h6>
      </form>
    </div>
  `;

  // Take a parent node and append form
  parentNode.appendChild(newEventFormContainer);

  // Cancel buttopn hides form
  const cancel = document.querySelector("h6[class='clickable']");
  cancel.addEventListener("click", e => {
    e.target.parentNode.parentNode.className = 'hidden';
    navigate(parentNode.id.split('-')[0])
  });

  // Handle submit for new event
  const form = document.getElementById('new-event-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Store form data and parse dates
    // Will need to add journal id
    const form = e.target;
    const name = e.target.name.value;
    const location = e.target.location.value;
    const start_date = new Date(form['start-date'].value.split('-'));
    const end_date = new Date(form['end-date'].value.split('-'));
    const t1 = new Date(form['start-time'].valueAsDate);
    const t2 = new Date(form['end-time'].valueAsDate);
    start_date.setHours(t1.getHours());
    start_date.setMinutes(t1.getMinutes());
    end_date.setHours(t2.getHours());
    end_date.setMinutes(t2.getMinutes());

    const postData = {
      headers: _HEADERS,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        location: location,
        start_date: start_date,
        end_date: end_date,
        journal_id: JSON.parse(sessionStorage.user).journal.id
      })
    };

    const url = 'http://localhost:3000/events';

    fetch( url, postData )
    .then( res => res.json() )
    .then( event => {
        console.log(event)
        setActiveUser();
        setTimeout(() => {
          const page = parentNode.id.split('-')[0];
          switch(page) {
            case 'year':
              renderYearPage(activeDate)
              break;
            case 'month':
              renderMonthPage(activeDate)
              break;
            case 'week':
              renderWeekPage(activeDate)
              break;
            case 'welcome':
              renderWelcomePagePrivate()
              break;
            };
        },100)
    });
  });
};

const renderEditEventForm = (eventObj,target) => {
  const editEventFormContainer = document.createElement('div');
  const start = new Date(eventObj.start_date);
  const end = new Date(eventObj.end_date);

  editEventFormContainer.innerHTML = `
  <div id='edit-event-container' class='show'>
    <h2>Edit Event</h2>
    <form id='edit-event-form' action='#'>
      <label for="name">Event Name: </label>
      <input type='text' class='text-field' name='name' placeholder='Event Name' value='${eventObj.name}'>
      <br />
      <label for="location">Location: </label>
      <input type='text' class='text-field' name='location' placeholder='Location (optional)' value='${eventObj.location}'>
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
            <td><strong class='clickable'>All Day?</strong></td>
          </tr>
      </table>
      <input type="submit" class='btn' value='Update'>
      <h6 class='clickable'>cancel</h6>
      <br />
      <input type='button' class='btn warn' value='DELETE' id='delete-event'>
    </form>
  </div>
  `;

  getOppositePage(target).innerHTML = '';
  getOppositePage(target).appendChild(editEventFormContainer);

  const form = document.getElementById('edit-event-form');
  const endTime = end.toLocaleTimeString().split(":")
  endTime.pop()
  endTime.join(":")
  form['start-time'].value = start;
  form['start-date'].valueAsDate = start;
  form['end-time'].value = end;
  form['end-date'].valueAsDate = end;
}


const renderEventItem = (eventObj, showDate, showMonth, showTime) => {
  const d = new Date(eventObj.start_date);
  let string = `${eventObj.name}`
  if ( showMonth ) { string += `${ d.getMonth() + 1 } `};
  if ( showDate ) { string += `${ d.getDate() } `};
  if ( showTime ) { string += ` @${ d.toLocaleTimeString() }`};
  const eventItem = document.createElement('span')
  eventItem.className = 'event-item'
  eventItem.innerHTML = string;
  eventItem.addEventListener('click', e => {
    renderEditEventForm(eventObj,e.target);
  })
  return eventItem;
}
