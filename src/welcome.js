// TO DO:
// Rework with authentication once sessions implimented
// Add event handlers for login, logout, new user, edit user
// Build out private user welcome page with:
// => List of journals / new journal button/form
// => List of todays tasks/events, plus outstanding tasks
// => Build out index page (but maybe this should be its own file)

// Hard code a user for testing purposes
const user = {
  username: 'shelle',
  first_name: 'Mishy',
  last_name: 'Jari',
  email: 'shelle@mishyjari.com',
};

const leftPage = document.querySelector("section[class='left']");
const rightPage = document.querySelector("section[class='right']");

// Render Sign-In / Registration Forms
const renderWelcomePublic = () => {
  renderLoginForm();
  renderNewUserForm();
  renderAboutPage();
};

// Render welcome page if user session exists
const renderWelcomePagePrivate = () => {

};

// Forms for public (not logged in) welcome spread

// Render login Form
const renderLoginForm = () => {
  const loginContainer = document.createElement('div');
  loginContainer.id = 'login-container';
  loginContainer.innerHTML = `
    <h2>Sign In</h2>
    <form id="login-form" action="#">
      <input type='text' name='username-or-email' placeholder='Username or Email'>
      <br />
      <input type='password' name='password' class='text-field' placeholder='Password' />
      <br />
      <input type='submit' id='login' class='submit btn' value='login'>
    </form>
  `;

  leftPage.appendChild(loginContainer);
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
};

// Render about page
const renderAboutPage = () => {
  const about = document.createElement('div');
  about.id = 'welcome-about';
  about.innerHTML = `
    <h1>Welcome to Arrow Journal</h1>
    <p>Arrow Journal is part organizer, part planner and part journal.</p>
    <p>With Arrow Journal you can:</p>
    <ul>
      <li>Do a thing</li>
      <li>Do another thing</li>
      <li>Do Something else</li>
      <li>Do something cool</li>
      <li>Do something lame</li>
    </ul>
    <p>Feel free to play around using the tabs up top.</p>
    <p>And if you'd like to save your jornal, use the sign up form on the left!</p>
  `;

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
