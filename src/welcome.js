// TO DO:
// Rework with authentication once sessions implimented
// Add event handlers for login, logout, new user, edit user
// Build out private user welcome page with:
// => List of journals / new journal button/form
// => List of todays tasks/events, plus outstanding tasks
// => Build out index page (but maybe this should be its own file)


// Render Sign-In / Registration Forms
const renderWelcomePublic = () => {
  clearPages();
  updatePageIds('welcome-page');

  renderLoginForm();
  renderNewUserForm();
  renderAboutPage();
};

// Render welcome page if user session exists
const renderWelcomePagePrivate = () => {
  clearPages();
  activeDate = new Date();
  const user = JSON.parse(sessionStorage.user);
  updatePageIds('welcome-page');

  leftPage.innerHTML = `
    <div id='welcome-private-left'>
      <h1>Welcome ${user.name}!</h1>
      <h2><strong>Today is:</strong> ${new Date().toDateString()}</h2>
      <div class="details-container">
        <div class="task-heading-container"><h3>Your Tasks for Today</h3><span class="add-btn add-task-btn"><i title="Add Task" class="fas fa-plus-square"></i></span></div>
        <div class="task-list-container">
          <ul id='welcome-tasks-list'></ul>
        </div>
        <div class="event-heading-container"><h3>Your Events for Today</h3><span class="add-btn add-event-btn"><i title="Add Event" class="fas fa-plus-square"></i></span></div>
        <div class="event-list-container">
          <ul id='welcome-events-list'</ul>
        </div>
      </div>
    </div>
  `;
  renderAboutPage()

  const tasksUl = document.getElementById('welcome-tasks-list');
  const eventsUl = document.getElementById('welcome-events-list');

  getEvents(ev => {
    if( new Date(ev.start_date).toLocaleDateString() === new Date().toLocaleDateString() ){
      const eventLi = document.createElement('li')
      eventLi.appendChild(renderEventItem(ev,false,false,true))
      eventsUl.appendChild(eventLi);
    }
  });
  getTasks(task => {
    if ( new Date(task.date).toLocaleDateString() === new Date().toLocaleDateString()) {
      const taskLi = document.createElement('li')
      taskLi.appendChild(renderTaskItem(task))
      tasksUl.appendChild(taskLi);
    }
  });

  document.querySelector("span[class='add-btn add-event-btn']").addEventListener("click", e => {
    rightPage.innerHTML = '';
    renderNewEventForm(rightPage);
    const date = new Date().toLocaleDateString()
    // Add Event form
    const newEventForm = document.getElementById('new-event-form');
    document.getElementById('new-event-container').className = 'show'
    newEventForm['start-date'].valueAsDate = new Date(date);
    newEventForm['end-date'].valueAsDate = new Date(date);
    newEventForm['start-time'].value = '12:00'
    newEventForm['end-time'].value = '13:00';
  })

  document.querySelector("span[class='add-btn add-task-btn']").addEventListener("click", e => {
    rightPage.innerHTML = '';
    renderNewTaskForm(rightPage);
    const date = new Date().toLocaleDateString()
    // Add Task form
    const newTaskForm = document.getElementById('new-task-form');
    document.getElementById('new-task-container').className = 'show';
    newTaskForm.date.valueAsDate = new Date(date);
  })

  //create memo form
  const taskFormContainer = document.createElement('div');
  leftPage.appendChild(taskFormContainer);

  taskFormContainer.innerHTML = `
      <div id="new-memo-container">
        <h2>Create a New Memo</h2>
        <form id="new-memo-form" action="#">
          <label for="title">Memo Title: </label>
          <input type="text" name="title" placeholder="Memo Title">
          <label for="content">Memo Content: </label>
          <textarea id="content" name="content" rows="4" cols="40" placeholder="Write your memo here"></textarea>
          <br />
          
          <input type="submit" class='btn' value='Add Memo'>
          <br />
        </form>
      </div>
  `;

  const form = document.getElementById('new-memo-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    // const date = new Date(form.date.valueAsDate);
    // const completed = false;

    const postData = {
      headers: _HEADERS,
      method: 'POST',
      body: JSON.stringify({
        name: title,
        content: content,
        journal_id: JSON.parse(sessionStorage.user).journal.id
      })
    };

    const url = 'http://localhost:3000/memos'

    fetch( url, postData )
    .then( res => res.json() )
    .then( memo => {
      console.log(memo)
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

  })

};

// Forms for public (not logged in) welcome spread

// Render login Form
const renderLoginForm = () => {
  const loginContainer = document.createElement('div');
  loginContainer.id = 'login-container';
  loginContainer.innerHTML = `
    <h2>Sign In</h2>
    <form id="login-form" action="#">
      <input type='text' name='username' placeholder='Username'>
      <br />
      <input type='password' name='password' class='text-field' placeholder='Password' />
      <br />
      <input type='submit' id='login' class='submit btn' value='login'>
    </form>
  `;

  leftPage.appendChild(loginContainer);

  const form = document.getElementById('login-form')

  form.addEventListener('submit', e => {
    e.preventDefault();

    const loginData = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    const headerData = {
      headers: _HEADERS,
      method: "POST",
      body: JSON.stringify(loginData)
    }

    const url = 'http://localhost:3000/login';

    fetch( url, headerData )
    .then( res => res.json() )
    .then( user => {
      // This is not secure. Don't do this. We will get back to secure sessions if theres time.
      createSession(user.id)
      renderWelcomePagePrivate(user)
    })
    .catch(err => {
      renderWelcomePublic();
      leftPage.querySelector('h2').innerHTML = 'Invalid Credentials!'
      // Kicking a JSON.parse error on invalid entries. Lets handle this better!
      console.log("Error in login: " + err)
    })
  })


};


// Render New User Form
const renderNewUserForm = () => {
    const newUserContainer = document.createElement('div');
    newUserContainer.id = 'new-user';
    newUserContainer.innerHTML = `
      <h2>New User?</h2>
      <form id='new-user-form' action='#' method='POST'>
        <input type='text' name='firstname' class='text-field' placeholder='First Name' />
        <br />
        <input type='text' name='lastname' class='text-field' placeholder='Last Name' />
        <br />
        <input type='text' name='username' class='text-field' placeholder='Create Username' />
        <br />
        <input type='email' name='email' class='text-field' placeholder='Email Address' />
        <br />
        <input type='password' name='password' class='text-field' placeholder='Password' />
        <br />
        <input type='password' name='confirm-password' class='text-field' placeholder='Confirm Password' />
        <br />
        <input type='submit' class='submit btn' id='submit-new-user' value='Create Account' />
      </form>
    `;
    leftPage.appendChild(newUserContainer);

    const form = document.getElementById('new-user-form')

    form.reset()

    form.addEventListener('submit', e => {
      e.preventDefault();

      const form = e.target;

      const newUserData = {
        first_name: form.firstname.value,
        last_name: form.lastname.value,
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
      };

      const headerData = {
        headers: _HEADERS,
        method: "POST",
        body: JSON.stringify(newUserData)
      };


      const url = 'http://localhost:3000/users'

      fetch(url, headerData)
      .then( res => res.json() )
      .then( user => {
        sessionStorage.clear()
        createSession(user.id)
        setActiveUser()
        renderWelcomePagePrivate(user)
      })
    })
};

// Render about page
const renderAboutPage = () => {
  const about = document.createElement('div');
  about.id = 'welcome-about';
  about.innerHTML = `<img src='assets/logo.png' alt='Arrow Journal' id='logo-welcome'>`
  rightPage.appendChild(about);
};

// Welcome spread for user thats logged in.

// Render user greeting with logout / edit account buttons
const renderUserGreeting = () => {
  const userGreetingContainer = document.createElement('div');
  userGreetingContainer.id = 'user-greeting-container';

  // This is using the hard-coded user instance right now.
  // Update with session once implemented
  userGreetingContainer.innerHTML = `
    <h1>Welcome, ${user.username}!</h1>
    <button class='btn' id='logout'>Logout</button>
    <button class='btn' id='edit-user-info'>Edit My Info</button>
  `;
  leftPage.appendChild(userGreetingContainer);
}


{/* <label for="start">Date: </label>
          <input type="date" name='date' value="${new Date().toLocaleDateString()}"/>
          <br /> */}