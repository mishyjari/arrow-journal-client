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
  return fetch('http://localhost:3000/events')
  .then( res => res.json() )
  .then( events => {
  events.forEach(event => {
    let e = new Event({
      name: event.name,
      location: event.location,
      start_date: new Date(Date.parse(event.start_date)),
      end_date: new Date(Date.parse(event.end_date))
    });
    method(e)
    });
  });
}

// Attaches new event form to parentNode arg. Degaults to hidden.
const renderNewEventForm = parentNode => {
  const newEventFormContainer = document.createElement('div');
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
    const start_date = new Date(form['start-date'].valueAsDate);
    const end_date = new Date(form['end-date'].valueAsDate);
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
        journal_id: 3 // Hard code for now. Will break when reseeded.
      })
    };
    const url = 'http://localhost:3000/events';

    fetch( url, postData )
    .then( res => res.json() )
    .then( () => {
        clearPages();
        renderMonthPage(start_date)
    })

  });
};
