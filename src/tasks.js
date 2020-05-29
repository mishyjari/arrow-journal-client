class Task {
  constructor(params){
    this.name = params.name
    this.date = params.date
    this.completed = params.completed
    this.important = params.important
    this.journal_id = params.journal_id
  }
};

const getTasks = method => {
  const tasks = getActiveUserJournal().tasks;
  tasks.forEach(task => method(task));
  checkOverflow();
};

const renderNewTaskForm = parentNode => {
  const taskFormContainer = document.createElement('div');
  taskFormContainer.innerHTML =  `
    <div id='new-task-container' class='hidden'>
      <h2>New Task</h2>
      <form id='new-task-form' action='#'>
        <label for="name">Task Name: </label>
        <input type='text' class='text-field' name='name' placeholder='Event Name'>
        <br />
        <label for="start">Start: </label>
        <input type="date" name='date' value="${new Date().toLocaleDateString()}"/>
        <br />
        <input type='checkbox' name='important' />
        <strong> Important? </strong>
        <br />
        <em>(only tasks marked important will appear on monthly and yearly overviews)</em>
        <br />
        <input type="submit" class='btn' value='Add Event'>
        <br />
        <h6 class='clickable'>cancel</h6>
      </form>
    </div>
  `;

  parentNode.appendChild(taskFormContainer);

  const cancel = document.querySelector("h6[class='clickable']");
  cancel.addEventListener("click", e => {
    document.getElementById('new-task-container').className = 'hidden';
    navigate(parentNode.id.split('-')[0])
  });

  const form = document.getElementById('new-task-form');
  form.addEventListener('submit', e => {
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
};

const renderTaskPopup = taskObj => {
  const taskPopupContainer = document.createElement('div')
  if ( taskObj.completed ){
    taskPopupContainer.className = 'task-popup-completed'
    taskPopupContainer.innerHTML = `
      <h3>${taskObj.name}</h3>
      <h4><em>Complete</em></h4>
      <h5>Click to edit or alt-click to mark incomplete</h5>
    `;
  } else if ( taskObj.important ) {
    taskPopupContainer.className = 'task-popup-important';
    taskPopupContainer.innerHTML = `
      <h3>IMPORTANT</h3>
      <h3>${taskObj.name}</h3>
      <h4><em>Inomplete</em></h4>
      <h5>Click to edit or alt-click to mark complete</h5>
    `;
  } else {
    taskPopupContainer.className = 'task-popup-normal'
    taskPopupContainer.innerHTML = `
      <h3>${taskObj.name}</h3>
      <h3><em>Inomplete</em></h3>
      <h5>Click to edit or alt-click to mark complete</h5>
    `;
  };
  return taskPopupContainer;
}

const renderTaskItem = taskObj => {

  const taskItem = document.createElement('span')

  if ( taskObj.completed ) {
    taskItem.className = 'task-item-completed';
  } else if ( taskObj.important ){
    taskItem.className = 'task-item-important';
  } else {
    taskItem.className = 'task-item-normal'
  }

  taskItem.textContent = taskObj.name
  if ( taskItem.important ) { taskItem.textContent += ' (!)'}

  taskItem.addEventListener('click', e => {
    //renderEditEventForm(eventObj,e.target);
    if ( e.altKey ) { toggleComplete(taskObj,e.target) }
  });

  taskItem.addEventListener('mouseover', e => {
    getOppositePage(e.target).appendChild(renderTaskPopup(taskObj))
  });

  taskItem.addEventListener('mouseleave', e => {
    const parentClass = e.target.className;

    let containerClass = parentClass.split('-')
    containerClass.splice(1,1,'popup')
    containerClass = containerClass.join('-')
    document.querySelector(`div[class='${containerClass}']`).className = 'hidden'
  });

  return taskItem;
}

const toggleComplete = (taskObj,parentNode  ) => {
  const completed = !taskObj.completed;
  const reqData = {
    headers: _HEADERS,
    method: "PATCH",
    body: JSON.stringify({completed: completed, name: taskObj.name})
  };
  const url = 'http:/localhost:3000/tasks/' + taskObj.id;
  fetch(url,reqData)
  .then( res => res.json() )
  .then( task => {
      console.log(task)
      setActiveUser();
      setTimeout(() => {
        const page = getParentPage(parentNode).id.split('-')[0];
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
  })
}
