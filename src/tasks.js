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
    e.target.parentNode.parentNode.className = 'hidden';
  });

  const form = document.getElementById('new-task-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = new Date(form.date.valueAsDate);
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
        }
      },100)
    });
  });
};
