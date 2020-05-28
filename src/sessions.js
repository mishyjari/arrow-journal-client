// This is a hack job sessions management system used strictly for development
const getActiveUserId = () => {
  if ( sessionStorage.getItem('userId') ){
    return sessionStorage.getItem('userId');
  } else {
    return false;
  }
};

const setActiveUser = () => {
  const userId = getActiveUserId()
  if (userId) {
    fetch (`http://localhost:3000/users/${userId}/journal`)
    .then( res => res.json() )
    .then( data => {
      sessionStorage.setItem('user', JSON.stringify({
        name: data.first_name + ' ' + data.last_name,
        username: data.username,
        email: data.email,
        journal: {
          id: data.journals[0].id,
          name: data.journals[0].name,
          events: JSON.stringify(data.events),
          tasks: JSON.stringify(data.tasks)
        }
      }));
      console.log('user data set in session storage')
    })
  } else {
    console.log('no user active')
  }
}

const getActiveUserJournal = () => {
  return {
    events: JSON.parse(JSON.parse(sessionStorage.user).journal.events),
    tasks: JSON.parse(JSON.parse(sessionStorage.user).journal.tasks)
  }
}

const resetSession = () => {
  sessionStorage.clear();
  updatePageIds('welcome-page')
  renderWelcomePublic();
  renderSettingsTab();
};

const createSession = id => {
  sessionStorage.setItem('userId', id)
  setActiveUser()
  renderSettingsTab();
};

// Return promose to deliver user's journal
const getUserJournal = id => {
  return fetch(`http://localhost:3000/users/${id}/journal`)
    .then( res => res.json() )
    .then( user => user.journals )
}
