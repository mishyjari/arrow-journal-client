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
              <td><strong class='clickable' id='all-day'>All Day?</strong></td>
            </tr>
        </table>
        <input type="submit" class='btn' value='Add Event'>
        <h6 class='clickable' id='cancel-btn'>cancel</h6>
      </form>
    </div>
  `;

  // Take a parent node and append form
  parentNode.appendChild(newEventFormContainer);

  // Cancel buttopn hides form
  const cancel = document.getElementById('cancel-btn')
  cancel.addEventListener("click", e => {
    document.getElementById('new-event-container').className = 'hidden';
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
    const start_time = form['start-time'].value.split(':');
    const end_time = form['end-time'].value.split(':')
    start_date.setHours(start_time[0]);
    start_date.setMinutes(start_time[1]);
    end_date.setHours(end_time[0]);
    end_date.setMinutes(end_time[1]);

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
          const page = getParentPage(form).id.split('-')[0];
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
  //getOppositePage(target).appendChild(renderEventDetails(eventObj))


  const cancel = document.querySelector("h6[class='clickable']");
  cancel.addEventListener("click", e => {
    document.getElementById('edit-event-container').className = 'hidden';
    navigate(getParentPage(e.target).id.split('-')[0])
  });

  const form = document.getElementById('edit-event-form');
  const endTime = end.toLocaleTimeString().split(":")
  endTime.pop()
  endTime.join(":")
  form['start-time'].value = timeString(start);
  form['start-date'].valueAsDate = start;
  form['end-time'].value = timeString(end);
  form['end-date'].valueAsDate = end;

  document.getElementById('delete-event').addEventListener('click', e => {

    const deleteData = {
      headers: _HEADERS,
      method: "DELETE",
    };
    const url = `http://localhost:3000/events/${eventObj.id}`;


    fetch(url, deleteData)
    .then( res => res.json() )
    .then( data => {
      console.log(data)
      setActiveUser()
      setTimeout(() => {

        const page = getParentPage(form).id.split('-')[0];
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
    })
  })

  form.addEventListener('submit', e => {

    e.preventDefault()

    const newStart = new Date(form['start-date'].value.split('-'))
    newStart.setHours(form['start-time'].value.split(':')[0]);
    newStart.setMinutes(form['start-time'].value.split(':')[1]);
    const newEnd = new Date(form['end-date'].value.split('-'))
    newEnd.setHours(form['end-time'].value.split(':')[0]);
    newEnd.setMinutes(form['end-time'].value.split(':')[1]);


    const body = {
      name: form.name.value,
      location: form.location.value,
      start_date: newStart,
      end_date: newEnd
    }

    // Send the patch req
    const patchData = {
      headers: _HEADERS,
      method: "PATCH",
      body: JSON.stringify(body)
    };

    fetch(`http://localhost:3000/events/${eventObj.id}`,patchData)
      .then( res => res.json() )
      .then( event => {
        console.log(event)
        setActiveUser();
        setTimeout(() => {
          const page = getParentPage(form).id.split('-')[0];
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
      })
  })

};

const renderEventDetails = eventObj => {
  const eventDetailContainer = document.createElement('div');
  eventDetailContainer.className = 'event-detail-container';
  eventDetailContainer.innerHTML = `
    <h3 id='event-detail-name'>Event Name</h3>
    <p>${eventObj.name}</p>
    <h3 id='event-detail-location'>Location</h3>
    <p>${eventObj.location ? eventObj.location : "none"}</p>
    <h3 id='event-detail-start'>Start Date</h3>
    <p>${new Date(eventObj.start_date).toLocaleString()}</p>
    <h3 id='event-detail-end'>End Date</h3>
    <p>${new Date(eventObj.end_date).toLocaleString()}</p>
  `;
  return eventDetailContainer;
};

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
  });
  eventItem.addEventListener('mouseover', e => {
    getOppositePage(e.target).appendChild(renderEventDetails(eventObj))
  })
  eventItem.addEventListener('mouseleave', e => {
    const container = document.querySelector("div[class='event-detail-container']");
    if ( container ) { container.className = 'hidden' }
  })
  return eventItem;
}

renderEventAndTaskForms = parentNode => {
  console.log(parentNode)
  const dualFormContainer = document.createElement('div');
  dualFormContainer.id = 'dual-form-container';
  // newEventFormContainer.className = "form-container";
  dualFormContainer.innerHTML = `
    <div id='new-event-container' class='container'>
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
              <td><strong class='clickable' id='all-day'>All Day?</strong></td>
            </tr>
        </table>
        <input type="submit" class='btn' value='Add Event'>
      </form>
    <br />
    </div>
    <div id='new-task-container' class='container'>
      <h2>New Task</h2>
      <form id='new-task-form' action='#'>
        <label for="name">Task Name: </label>
        <input type='text' class='text-field' name='name' placeholder='Task Name'>
        <br />
        <label for="start">Start: </label>
        <input type="date" name='date' value="${new Date().toLocaleDateString()}"/>
        <br />
        <input type='checkbox' name='important' />
        <strong> Important? </strong>
        <br />
        <em>(only tasks marked important will appear on monthly and yearly overviews)</em>
        <br />
        <input type="submit" class='btn' value='Add Task'>
        <br />
        <h6 class='clickable'>cancel</h6>
      </form>
    </div>
  `;

  parentNode.innerHTML = ''
  parentNode.appendChild(dualFormContainer);


  // Handle submit for new event
  const eventForm = document.getElementById('new-event-form');
  eventForm.addEventListener('submit', e => {
    e.preventDefault();

    // Store form data and parse dates
    // Will need to add journal id
    const form = e.target;
    const name = e.target.name.value;
    const location = e.target.location.value;

    const start_date = new Date(form['start-date'].value.split('-'));
    const end_date = new Date(form['end-date'].value.split('-'));
    const start_time = form['start-time'].value.split(':');
    const end_time = form['end-time'].value.split(':')
    start_date.setHours(start_time[0]);
    start_date.setMinutes(start_time[1]);
    end_date.setHours(end_time[0]);
    end_date.setMinutes(end_time[1]);

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
          const page = getParentPage(form).id.split('-')[0];
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



  const taskForm = document.getElementById('new-task-form');
  taskForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = new Date(form.date.value.split("-"));
    const important = form.important.checked;
    const completed = false;


    const postData = {
      headers: _HEADERS,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        date: date,
        important: important,
        completed: completed,
        journal_id: JSON.parse(sessionStorage.user).journal.id
      })
    };

    const url = 'http://localhost:3000/tasks';

    fetch( url, postData )
    .then( res => res.json() )
    .then( task => {
      console.log(task)
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
        }
      },100)
    });
  });
  // Cancel buttopn hides form
  const cancel = document.querySelector("h6[class='clickable']");
  cancel.addEventListener("click", e => {
    document.getElementById('new-task-container').className = 'hidden';
    navigate(parentNode.id.split('-')[0])
  });
}
